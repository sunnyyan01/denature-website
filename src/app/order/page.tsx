"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { DBContext } from "../providers";
import { deleteDoc, doc } from "firebase/firestore";

export default function OrderConfirmationPage() {
  const db = useContext(DBContext);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("status") == "cancelled" && searchParams.get("orderId")) {
      deleteDoc(doc(db, "orders", searchParams.get("orderId")!));
    } else if (searchParams.get("status") == "success") {
      window.localStorage.removeItem("cart");
      window.localStorage.removeItem("timeslot");
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-gray-200">
        <div className="text-green-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 font-inter">
            {searchParams.get("status") === "success" ? "Order Confirmed!" : "Order Cancelled"}
        </h1>
        <p className="text-lg text-gray-600 mb-6 font-inter">
          {
            searchParams.get("status") === "success" &&
            "Thank you for your purchase. Your order has been successfully placed."
          }
          {
            searchParams.get("status") === "cancelled" &&
            "Your order has been cancelled."
          }
        </p>
        {
          searchParams.get("status") === "success" &&
          <p className="text-md font-medium text-gray-700 mb-8 font-inter">
            Your Order ID: <span className="text-blue-600 font-semibold">{searchParams.get("orderId")}</span>
          </p>
        }
        <button
          onClick={() => router.push("/menu")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-inter"
        >
          Return to menu
        </button>
      </div>
    </div>
  );
}