import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    let params = new URL(request.url!).searchParams;
    let orderId = params.get("orderId");
    let customerId = params.get("customerId");
    let orderTotal = params.get("orderTotal");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      client_reference_id: orderId,
      customer: customerId,
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      line_items: [
        {
          price_data: {
            product_data: {
              name: `De Nature Order ${orderId}`
            },
            unit_amount: orderTotal,
            currency: "AUD",
          },
          quantity: 1,
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      mode: 'payment',
      success_url: `${origin}/order?orderId=${orderId}&sessionId={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${origin}/order?orderId=${orderId}&status=cancelled`,
    });
    return NextResponse.json(session);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}