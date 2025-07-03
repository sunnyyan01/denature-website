"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext, DBContext } from "../providers";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { OrderBox } from "./OrderBox";
import { Checkbox } from "@heroui/react";

export default function OrdersPage() {
  let auth = useContext(AuthContext);
  let [user] = useAuthState(auth);

  let db = useContext(DBContext);

  let [orders, setOrders] = useState<Array<Order>>([]);
  let updateStatus = (newStatus: string, idx: number) => {
    setOrders(prev => {
      prev[idx] = {...prev[idx], status: newStatus}
      return prev;
    });
  }
  let [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      let q = (
        showCompleted
          ? query(collection(db, "orders"), where("user_id", "==", user.uid))
          : query(collection(db, "orders"), where("user_id", "==", user.uid), where("status", "!=", "completed"))
      );
      let snapshot = await getDocs(q);
      setOrders(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as any);
    }
    fetchOrders();
  }, [user, showCompleted]);

  return (
    <main style={{ background: '#F8F6F1' }} className="flex flex-col p-4 pt-12">
      <h1 className="mb-8">My Orders</h1>

      <Checkbox isSelected={showCompleted} onValueChange={setShowCompleted}>
        Show Completed Orders
      </Checkbox>

      <div className="flex flex-col items-center justify-items-center min-w-screen">
        {orders.map((order, idx) => (
          <OrderBox
            key={idx}
            order={order}
            setStatus={(newStatus: string) => updateStatus(newStatus, idx)}
          />
        ))}
      </div>
    </main>
  )
}