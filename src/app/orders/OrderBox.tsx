import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DBContext } from '../providers';
import { doc, getDoc } from 'firebase/firestore';
import { currencyFormat, timeFormat } from '@/utils/format';

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
    return <p className="my-auto">
      Order received. We will be in contact if there are any issues.
    </p>;
  if (status == "completed")
    return <p className="text-green-600 my-auto">
      Order complete. Enjoy your food!
    </p>;
}

interface OrderBoxProps {
  order: Order;
}

export const OrderBox: React.FC<OrderBoxProps> = ({ order }) => {
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
    <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10 max-w-4xl w-full border border-gray-200 mb-4">

      {/* Order ID */}
      <div className="mb-4 bg-blue-50 p-4 rounded-md border border-blue-200">
        <p className="text-sm font-semibold text-blue-700">
          Order ID: {" "}
          <span className="text-md font-bold text-blue-900 font-mono">{order.id}</span>
        </p>
      </div>

      {/* Items */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
          Items
        </h2>
        {Object.entries(order.cart).map(([id, qty], idx) => (
          <p key={idx} className="hover:bg-gray-50">
            {qty}x {productsNames[id]}
          </p>
        ))}
      </div>

      {/* Total Paid */}
      <div className="flex justify-between items-center bg-green-50 p-4 rounded-md mb-4 border border-green-200">
        <p className="text-lg font-semibold text-green-700">Total Paid:</p>
        <p className="text-3xl font-extrabold text-green-900">
          {currencyFormat(order.cartTotal)}
        </p>
      </div>

      {/* Status, Delivery Time, Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-4 rounded-md border border-purple-200 flex flex-col">
          <OrderStatus status={order.status} checkoutStatus={checkoutSession.status} />
          {checkoutSession.status == "open" && (
            <a className="text-blue-500 text-lg font-bold text-right" href={checkoutSession.url}>
              Complete Checkout &gt;
            </a>
          )}
        </div>

        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <p className="text-lg font-semibold text-yellow-700 mb-2">Delivery Timeslot:</p>
          <p className="text-xl font-bold text-yellow-900">{timeFormat(order.timeslot)}</p>
        </div>
      </div>

      <div className="mt-6 bg-indigo-50 p-4 rounded-md border border-indigo-200">
        <p className="text-lg font-semibold text-indigo-700 mb-2">Deliver To:</p>
        <p className="text-xl text-indigo-900 whitespace-pre-line">
          {assembledAddress}
        </p>
      </div>
    </div>
  );
};
