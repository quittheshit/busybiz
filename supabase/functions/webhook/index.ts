import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new (await import('https://esm.sh/stripe@12.0.0')).default(
  Deno.env.get('STRIPE_SECRET_KEY') ?? '',
  { apiVersion: '2022-11-15' }
)

const cryptoProvider = Deno.createHttpClient({
  http2: false,
})

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        
        // Get customer from database
        const { data: customer } = await supabaseClient
          .from('stripe_customers')
          .select('user_id')
          .eq('customer_id', session.customer)
          .single()

        if (!customer) {
          console.error('Customer not found:', session.customer)
          break
        }

        // Create order record
        await supabaseClient
          .from('stripe_orders')
          .insert({
            checkout_session_id: session.id,
            payment_intent_id: session.payment_intent,
            customer_id: session.customer,
            amount_subtotal: session.amount_subtotal,
            amount_total: session.amount_total,
            currency: session.currency,
            payment_status: session.payment_status,
            status: 'completed'
          })

        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object

        // Get customer from database
        const { data: customer } = await supabaseClient
          .from('stripe_customers')
          .select('user_id')
          .eq('customer_id', subscription.customer)
          .single()

        if (!customer) {
          console.error('Customer not found:', subscription.customer)
          break
        }

        // Get payment method details
        let paymentMethodBrand = null
        let paymentMethodLast4 = null

        if (subscription.default_payment_method) {
          try {
            const paymentMethod = await stripe.paymentMethods.retrieve(
              subscription.default_payment_method
            )
            paymentMethodBrand = paymentMethod.card?.brand
            paymentMethodLast4 = paymentMethod.card?.last4
          } catch (err) {
            console.error('Error retrieving payment method:', err)
          }
        }

        // Upsert subscription
        await supabaseClient
          .from('stripe_subscriptions')
          .upsert({
            customer_id: subscription.customer,
            subscription_id: subscription.id,
            price_id: subscription.items.data[0]?.price.id,
            current_period_start: subscription.current_period_start,
            current_period_end: subscription.current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end,
            payment_method_brand: paymentMethodBrand,
            payment_method_last4: paymentMethodLast4,
            status: subscription.status,
          })

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        // Update subscription status
        await supabaseClient
          .from('stripe_subscriptions')
          .update({
            status: 'canceled',
            deleted_at: new Date().toISOString()
          })
          .eq('subscription_id', subscription.id)

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})