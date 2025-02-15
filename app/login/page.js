"use client"
import React, { useState } from "react";
import { signIn } from "../functions/auth";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = signIn(email, password);
    router.push('/home');
  };

  return (
    <div className="h-screen w-screen bg-red-400 flex">
      <div className="w-20 bg-red-400 text-white flex items-center py-6 space-y-6 fixed h-full">
      </div>

      <main className="flex-1 flex justify-center items-center p-8 ml-20">
          <div className="w-[105%] h-[107%] bg-white rounded-2xl shadow-lg p-8 flex justify-center items-center">
            <div className="flex flex-col bg-red-400 p-6 rounded-lg w-96 h-96 justify-center">
              <h1 className="text-white text-center">Login</h1>
              <label className="text-white">Email:</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-3 border rounded-full outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="text-white">Password:</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-3 border rounded-full outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="flex justify-center mt-4">
                <button
                  className="p-2 rounded-lg hover:bg-red-300 transition-colors w-20 text-white bg-red-500"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              
            </div>
          </div>
        </main>
    </div>


    
  );
}
