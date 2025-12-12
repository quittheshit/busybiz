import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { priceId, successUrl, cancelUrl } = await req.json()

    // Create Stripe checkout session
    const stripe = new (await import('https://esm.sh/stripe@12.0.0')).default(
      Deno.env.get('STRIPE_SECRET_KEY') ?? '',
      { apiVersion: '2022-11-15' }
    )

    // Try to get authenticated user (optional)
    const authHeader = req.headers.get('Authorization')
    let user = null
    let customerId: string | undefined

    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      )

      const { data: { user: authUser } } = await supabaseClient.auth.getUser()
      user = authUser

      // Check if customer exists for authenticated user
      if (user) {
        const { data: existingCustomer } = await supabaseClient
          .from('stripe_customers')
          .select('customer_id')
          .eq('user_id', user.id)
          .single()

        if (existingCustomer) {
          customerId = existingCustomer.customer_id
        } else {
          // Create new Stripe customer for authenticated user
          const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
              supabase_user_id: user.id,
            },
          })

          customerId = customer.id

          // Save customer to database
          await supabaseClient
            .from('stripe_customers')
            .insert({
              user_id: user.id,
              customer_id: customerId,
            })
        }
      }
    }

    // Create checkout session (guest or authenticated)
    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    }

    // Add customer if we have one, otherwise collect email
    if (customerId) {
      sessionConfig.customer = customerId
      sessionConfig.metadata = {
        user_id: user?.id,
      }
    } else {
      sessionConfig.customer_creation = 'always'
      sessionConfig.customer_email = undefined
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})