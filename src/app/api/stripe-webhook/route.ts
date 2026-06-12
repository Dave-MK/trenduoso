import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-04-10',
})

// Use service role key so we can write to profiles without RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 })
  }

  const getUserId = (obj: { metadata?: Stripe.Metadata | null }): string | null =>
    obj.metadata?.user_id ?? null

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = getUserId(session)
      if (userId) {
        await supabase
          .from('profiles')
          .update({ plan: 'pro', stripe_customer_id: session.customer as string })
          .eq('id', userId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const userId = getUserId(sub)
      if (userId) {
        await supabase.from('profiles').update({ plan: 'free' }).eq('id', userId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const userId = getUserId(sub)
      if (userId) {
        const plan = sub.status === 'active' ? 'pro' : 'free'
        await supabase.from('profiles').update({ plan }).eq('id', userId)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
