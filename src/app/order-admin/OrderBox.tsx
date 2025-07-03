import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DBContext } from '../providers';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { currencyFormat, timeFormat } from '@/utils/format';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ChevronDown } from 'lucide-react';

interface OrderStatusProps {
  status: string;
  setStatus: (status: any) => void;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status, setStatus }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant='bordered'
          endContent={<ChevronDown fill="currentColor" size={16} />}
          className='capitalize'
        >
          {status}
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={setStatus}>
        <DropdownItem key="pending">Pending</DropdownItem>
        <DropdownItem key="completed">Completed</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

interface OrderBoxProps {
  order: Order;
  setStatus: Function;
}

export const OrderBox: React.FC<OrderBoxProps> = ({ order, setStatus }) => {
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

  const updateStatus = (newStatus: string) => {
    updateDoc(doc(db, "orders", order.id), {status: newStatus});
    setStatus(newStatus);
  }

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
      <div className="bg-green-50 p-4 rounded-md mb-4 border border-green-200">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-green-700">Total Due:</p>
          <p className="text-xl font-extrabold text-green-900">
            {currencyFormat(order.cartTotal)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-green-700">Total Paid:</p>
          <p className="text-xl font-extrabold text-green-900">
            {currencyFormat(checkoutSession.amount_total)}
          </p>
        </div>
      </div>

      {/* Status, Delivery Time, Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-4 rounded-md border border-purple-200 flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <p>Order Status</p>
            <OrderStatus
              status={order.status}
              setStatus={updateStatus}
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Checkout Status</p>
            <p className={checkoutSession.status === "complete" ? "text-green-600" : "text-red-400"}>
              {checkoutSession.status === "complete" ? "Complete" : "Incomplete"}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Payment Processing Status</p>
            <p>
              {checkoutSession.payment_status === "unpaid" ? "Pending" : "Settled"}
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <p className="text-lg font-semibold text-yellow-700 mb-2">Delivery Timeslot:</p>
          <p className="text-xl font-bold text-yellow-900">{timeFormat(order.timeslot)}</p>
        </div>
      </div>

      <div className="mt-6 bg-indigo-50 p-4 rounded-md border border-indigo-200 flex">
        <div className="flex flex-col w-1/2">
          <p className="text-lg font-semibold text-indigo-700 mb-2">Delivery Address</p>
          <p className="text-xl text-indigo-900 whitespace-pre-line">
            {assembledAddress}
          </p>
        </div>

        <div className="flex flex-col w-1/2">
          <p className="text-lg font-semibold text-indigo-700 mb-2">Contact Details</p>
          <p className="text-xl text-indigo-900">
            Email: {checkoutSession.customer_details?.email || "Not available"}<br />
            Phone: {checkoutSession.customer_details?.phone || "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
};
