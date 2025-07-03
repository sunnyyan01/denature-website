import { NextRequest, NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const customer = await stripe.customers.retrieve(id);
    return NextResponse.json(customer);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
