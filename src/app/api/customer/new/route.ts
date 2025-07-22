import { NextRequest, NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    let params = request.nextUrl.searchParams;

    const customer = await stripe.customers.create({
      name: params.get("name") as string,
      email: params.get("email") as string,
    });
    return NextResponse.json(customer);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}