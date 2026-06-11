import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' })

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      // TODO: update user plan in Supabase based on event.data.object.metadata.userId
      console.log('Checkout completed:', event.data.object.id)
      break
    }
    case 'customer.subscription.deleted': {
      // TODO: downgrade user to free plan in Supabase
      console.log('Subscription cancelled:', event.data.object.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
