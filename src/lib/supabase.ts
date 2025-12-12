import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface StripeCustomer {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  created_at: string;
}

export interface StripeOrder {
  id: string;
  user_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  status: string;
  product_name: string;
  created_at: string;
}

export interface StripeSubscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  status: string;
  product_name: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}