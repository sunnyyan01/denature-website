"use client";

import { useRouter } from "next/navigation";
import { use, useContext, useEffect } from "react";
import { DBContext } from "../providers";
import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "@heroui/react";

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { status: string, orderId: string},
}) {
  const db = useContext(DBContext);

  const {status, orderId} = searchParams;
  const router = useRouter();

  if (status == "cancelled") {
    deleteDoc(doc(db, "orders", orderId))
      .then(() => router.push("/menu"));
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 font-inter">
            Restoring your cart...
          </h1>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (status == "success") {
      localStorage.removeItem("cart");
      localStorage.removeItem("timeslot");
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#E2DED0] p-6 sm:p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-gray-200">
        <div className="text-green-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#373D27] mb-4 font-inter">
          Order Confirmed!
        </h1>
        <p className="text-lg text-[#373D27] mb-6 font-inter">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="text-md font-medium text-[#373D27] mb-8 font-inter">
          Your Order ID: <span className="text-[#425A26] text-lg font-bold font-mono">{orderId}</span>
        </p>
        <div className="flex justify-evenly">
          <Button
            onPress={() => router.push("/menu")}
            size="lg"
            className="bg-[#373D27] text-white"
          >
            Place another order
          </Button>
          <Button
            onPress={() => router.push("/orders")}
            size="lg"
            className="bg-[#373D27] text-white"
          >
            My orders
          </Button>
        </div>
      </div>
    </div>
  );
}