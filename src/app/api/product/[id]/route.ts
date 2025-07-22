import { NextRequest, NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let { name, price, image } = await request.json();

    const product = await stripe.products.create({
      name,
      id,
      default_price_data: {
        currency: "aud",
        unit_amount: price,
      },
      images: [image],
    })
    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let { name, price, } = await request.json();

    await stripe.products.update(id, { name });
    let prices = await stripe.prices.list({
      active: true,
      product: id,
    })
    let priceObj = prices.data[0];
    if (prices.data[0].unit_amount != price) {
      priceObj = await stripe.prices.create({
        currency: "aud",
        product: id,
        unit_amount: price,
      });
      await stripe.products.update(id, { default_price: priceObj.id });
      await stripe.prices.update(prices.data[0].id, { active: false });
    }
    return NextResponse.json({ price_id: priceObj.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    stripe.products.update(id, {active: false});
    return new NextResponse(null, {status: 204});
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}