import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DBContext } from '../providers';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { addressFormat, currencyFormat, timeFormat } from '@/utils/format';
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
  cancelOrder: (isPaid: boolean) => void;
}

export const OrderBox: React.FC<OrderBoxProps> = ({ order, setStatus, cancelOrder }) => {
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
    return name + "\n" + addressFormat(address);
  }, [checkoutSession]);

  const updateStatus = (newStatus: string) => {
    updateDoc(doc(db, "orders", order.id), {status: newStatus});
    setStatus(newStatus);
  }

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
          <span className="text-xl mr-3">Total Due:</span>
          <span className="text-3xl">{currencyFormat(order.cartTotal)}</span>
        </div>
        <div className="font-bold text-[#373D27] flex items-center justify-end">
          <span className="text-xl mr-3">Total Paid:</span>
          <span className="text-3xl">{currencyFormat(checkoutSession.amount_total)}</span>
        </div>
      </div>

      {/* Status, Delivery Time, Address */}
      <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-md border-2 border-[#E4BD82] flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <p>Order Status</p>
            <OrderStatus
              status={order.status}
              setStatus={updateStatus}
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Checkout Status</p>
            <p className={checkoutSession.status === "complete" ? "text-green-600 capitalize" : "text-red-400 capitalize"}>
              {checkoutSession.status}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Payment Processing Status</p>
            <p>
              {checkoutSession.payment_status === "unpaid" ? "Pending" : "Settled"}
            </p>
          </div>
        </div>

        <div className="bg-[#E4BD82] text-[#373D27] p-4 rounded-md border-2 border-transparent">
          <p className="text-lg font-semibold mb-2">Delivery Timeslot:</p>
          <p className="text-xl font-bold">{timeFormat(order.timeslot)}</p>
        </div>
      </div>

      <div className="mb-2 text-[#373D27] bg-[#C0C95F] p-4 rounded-md border-1 border-[#425A26] flex">
        <div className="flex flex-col w-1/2">
          <p className="text-lg font-bold mb-2">Delivery Address</p>
          <p className="text-xl whitespace-pre-line">
            {assembledAddress}
          </p>
        </div>

        <div className="flex flex-col w-1/2">
          <p className="text-lg font-bold mb-2">Contact Details</p>
          <p className="text-xl">
            Email: {checkoutSession.customer_details?.email || "Not available"}<br />
            Phone: {checkoutSession.customer_details?.phone || "Not available"}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          className='bg-[#373D27] text-white justify-self-end inline'
          onPress={() => cancelOrder(checkoutSession.status == "complete")}
        >
          Cancel Order
        </Button>
      </div>
    </div>
  );
};
