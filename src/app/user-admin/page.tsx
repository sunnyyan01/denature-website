"use client";

import { useContext, useEffect, useState } from "react";
import { DBContext } from "../providers";
import { Button, Input } from "@heroui/react";
import { collection, doc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { addressFormat } from "@/utils/format";

export default function UserAdminPage() {
  const db = useContext(DBContext);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [stripeData, setStripeData] = useState<Record<string, any>>({});

  const lookupUser = async () => {
    let q = query(collection(db, "users"), where("email", "==", email), limit(1));
    let docs = await getDocs(q);
    if (docs.empty) setError("No user found under that email");
    docs.forEach(doc => setUser({...doc.data(), id: doc.id}));
  }
  const toggleUserAdmin = async () => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.id), {admin: !user.admin});
    setUser(prev => ({...prev, admin: !user.admin}));
  }

  useEffect(() => {
    if (!user) return;
    fetch(`/api/customer/${user.stripe_id}`)
      .then(resp => resp.json())
      .then(data => setStripeData(data));
  }, [user])

  return (
    <main className="flex justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-[#E2DED0] text-[#373D27] p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6">User Admin</h1>
        <p className="text-center text-semibold mb-6 text-sm">
          Lookup user info
        </p>

        {error && (
          <div className="p-3 mb-4 rounded-lg text-sm bg-red-100 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <Input
          label="Email"
          placeholder="Enter user email"
          className="mb-2"
          onValueChange={setEmail}
        />
        <Button
          className="bg-[#425A26] w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          onPress={lookupUser}
        >
          Lookup User
        </Button>

        {user && <table className="mt-4 text-left">
          <tr>
            <th>User ID</th>
            <td className="font-mono">{user.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{stripeData.name}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{stripeData.phone || "Unknown"}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{addressFormat(stripeData.address) || "Unknown"}</td>
          </tr>
          <tr>
            <th>Admin Status</th>
            <td>
              <span className="mr-4">{user.admin ? "Yes" : "No"}</span>
              <Button onPress={toggleUserAdmin}>
                {user.admin ? "Revoke Admin Status" : "Make Admin"}
              </Button>
            </td>
          </tr>
        </table>}
      </div>
    </main>
  )
}