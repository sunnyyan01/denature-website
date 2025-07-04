// app/login/page.js
'use client'; // This directive is necessary for client-side components in the App Router

import { friendlyAuthError } from '@/lib/firebase/auth';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { use, useContext, useEffect, useState } from 'react';
import { AuthContext, DBContext } from '../providers';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserCredential } from 'firebase/auth';
import { Button } from '@heroui/react';

export default function LoginPage(
  {
    searchParams
  } : {
    searchParams: {returnTo: string},
}) {
  const { returnTo } = searchParams;
  const router = useRouter();

  const db = useContext(DBContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const [
    signInWithEmailAndPassword,
    emailUser,
    emailLoading,
    emailError,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  const startEmailSignIn = () => {
    signInWithEmailAndPassword(email, password);
  };

  const startGoogleSignIn = () => {
    signInWithGoogle();
  }

  const setUpNewUser = async (cred: UserCredential | undefined) => {
    if (!cred?.user.uid) return;
    let user = cred.user;
    let userRecord = await getDoc(doc(db, "users", user.uid));
    if (userRecord.exists()) return;
    let queryParams = new URLSearchParams({
      name: user.displayName!,
      email: user.email!,
    })
    let resp = await fetch(
      "/api/customer/new" + queryParams.toString(),
      { method: "POST" }
    );
    let stripe_id = (await resp.json()).id;
    setDoc(
      doc(db, "users", cred.user.uid),
      {
        stripe_id,
        admin: false,
      }
    )
  }

  useEffect(() => {
    if (googleUser)
      setUpNewUser(googleUser);
    if (emailUser || googleUser)
      router.push("/" + (returnTo || "menu"));
  }, [emailUser, googleUser]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-[#E2DED0] p-8 rounded-lg shadow-md w-full max-w-md mb-4">
        <h2 className="text-2xl text-[#373D27] font-bold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#373D27] text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#373D27] leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-[#373D27] text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#373D27] mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {emailError && <p className="text-red-500 text-xs italic mb-2">{friendlyAuthError(emailError)}</p>}
          <div className="flex items-center justify-between">
            <Button
              className="bg-[#425A26] text-white font-bold py-2 px-4 w-full"
              disabled={emailLoading}
              onPress={startEmailSignIn}
            >
              {emailLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>


      </div>
      <div className="bg-[#E2DED0] p-8 rounded-lg shadow-md w-full max-w-md mb-4">
        {googleError && <p className="text-red-500 text-xs italic mb-2">{friendlyAuthError(googleError)}</p>}
        <Button
          className="bg-[#425A26] text-white font-bold py-2 px-4 w-full"
          onPress={startGoogleSignIn}
        >
          {googleLoading ? 'Logging in...' : 'Login with Google'}
        </Button>
      </div>
      <div className="bg-[#E2DED0] p-6 rounded-lg shadow-md w-full max-w-md mb-4 flex flex-col items-center">
        <p>Don't have an account?</p>
        <a className="text-[#425A26] text-lg font-bold" href="/register">Register here &gt;</a>
      </div>
      <div className="bg-[#E2DED0] p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <p>Forgotten your password?</p>
        <a className="text-[#425A26] text-lg font-bold" href="/reset-password">Reset it here &gt;</a>
      </div>
    </div>
  );
}