import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DBContext } from '../providers';
import { doc, getDoc } from 'firebase/firestore';
import { currencyFormat, timeFormat } from '@/utils/format';
import { Button } from '@heroui/react';

interface OrderStatusProps {
  status: string;
  checkoutStatus: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status, checkoutStatus }) => {
  if (checkoutStatus == "expired")
    return <p className="my-auto text-red-400">
      You did not finish checking out in time. This order will be cancelled.
    </p>;
  if (checkoutStatus == "open")
    return <p className="text-orange-600 my-auto">
      You did not finish checking out. Please use the link below to complete checkout.
    </p>;
  if (status == "pending")
    return <p className="text-[#373D27] my-auto">
      Order received. We will be in contact if there are any issues.
    </p>;
  if (status == "completed")
    return <p className="text-green-600 my-auto">
      Order complete. Enjoy your food!
    </p>;
}

interface OrderBoxProps {
  order: Order;
  cancelOrder: () => void;
}

export const OrderBox: React.FC<OrderBoxProps> = ({ order, cancelOrder }) => {
  let db = useContext(DBContext);

  const getProductName = async (id: string) => {
    let productRecord = await getDoc(doc(db, "products", id));
    if (productRecord.exists())
      return productRecord.data()!["name"];
    else
      return "Unknown Product";
  }

  let [productsNames, setProductNames] = useState<Record<string, string>>({});
  let [checkoutSession, setCheckoutSession] = useState<Record<string, any>>({});
  useEffect(() => {
    let fetchFriendlyCart = async () => {
      let temp: Record<string, string> = {};
      for (let productId in order.cart) {
        temp[productId] = await getProductName(productId);
      }
      setProductNames(temp);
    }
    fetchFriendlyCart();

    let fetchCheckoutSession = async () => {
      let resp = await fetch(`/api/checkout_session/${order.session_id}`);
      setCheckoutSession(await resp.json());
    }
    fetchCheckoutSession();
  }, [order])

  let assembledAddress = useMemo(() => {
    if (!checkoutSession.collected_information?.shipping_details) return "Not available";
    let name = checkoutSession.collected_information.shipping_details.name;
    let address = checkoutSession.collected_information.shipping_details.address;
    return [
      name,
      address.line1,
      address.line2,
      `${address.city} ${address.state} ${address.postal_code}`,
    ].filter(x => x).join("\n")
  }, [checkoutSession]);

  return (
    <div className="bg-[#E2DED0] shadow-xl rounded-lg p-6 sm:p-8 lg:p-10 max-w-4xl w-full border border-gray-200 mb-4">
      {/* Order ID */}
      <p className="text-sm font-bold text-[#373D27] mb-2">
        Order ID: {" "}
        <span className="text-md font-mono">{order.id}</span>
      </p>

      {/* Items */}
      <div className="mb-2 text-[#373D27] bg-[#C0C95F] border-1 border-[#425A26] rounded-xl p-4">
        <h2 className="text-2xl font-bold mb-1">
          Items
        </h2>
        {Object.entries(order.cart).map(([id, qty], idx) => (
          <p key={idx} className="mb-1">
            {qty}x {productsNames[id]}
          </p>
        ))}
        <div className="font-bold text-[#373D27] flex items-center justify-end">
          <span className="text-xl mr-3">Total Paid:</span>
          <span className="text-3xl">{currencyFormat(checkoutSession.amount_total)}</span>
        </div>
      </div>

      {/* Status, Delivery Time, Address */}
      <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-md border-2 border-[#E4BD82] flex flex-col">
          <OrderStatus status={order.status} checkoutStatus={checkoutSession.status} />
          {checkoutSession.status == "open" && (
            <a className="text-[#425A26] text-lg font-bold text-right" href={checkoutSession.url}>
              Complete Checkout &gt;
            </a>
          )}
        </div>

        <div className="bg-[#E4BD82] text-[#373D27] p-4 rounded-md border-2 border-transparent">
          <p className="text-lg font-semibold mb-2">Delivery Timeslot:</p>
          <p className="text-xl font-bold">{timeFormat(order.timeslot)}</p>
        </div>
      </div>

      <div className="mb-2 text-[#373D27] bg-[#C0C95F] border-1 border-[#425A26] rounded-xl p-4">
        <p className="text-lg font-bold mb-2">Deliver To:</p>
        <p className="text-xl whitespace-pre-line">
          {assembledAddress}
        </p>
      </div>

      {checkoutSession.status != "complete" && (
        <div className="flex justify-end">
          <Button
            className='bg-[#373D27] text-white justify-self-end inline'
            onPress={cancelOrder}
          >
            Cancel Order
          </Button>
        </div>
      )}
    </div>
  );
};
