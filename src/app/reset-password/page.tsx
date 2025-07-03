"use client";

import { FormEventHandler, useContext, useState } from "react";
import { AuthContext } from "../providers";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { Button } from "@heroui/react";

export default function ResetPasswordPage() {
  const auth = useContext(AuthContext);
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handler for form submission
  const handleSubmit = async () => {
    setMessage('');

    let success = await sendPasswordResetEmail(email);
    if (success)
      setMessage('If an account with that email exists, a password reset link has been sent to your inbox. Please check your spam folder as well.');
    else
      setMessage('An error occurred: ' + error?.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-[#E2DED0] p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-[#373D27] mb-6">Forgot Your Password?</h1>
        <p className="text-center text-[#373D27] text-semibold mb-6 text-sm">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        {message && (
          <div className={`p-3 mb-4 rounded-lg text-sm ${error ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
            {message}
          </div>
        )}

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#373D27] mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <Button
            className="bg-[#425A26] w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={sending}
            onPress={handleSubmit}
          >
            {sending ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}