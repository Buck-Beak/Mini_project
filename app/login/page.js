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
    signIn(email, password);
    router.push('/');
  };

  return (
    <div className="login-container">
      <div className="login-form">
      <h1>Login</h1>
      <label>Email:</label>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="login-button"
        onClick={handleLogin}
      >
        Login
      </button>
      </div>
    </div>
  );
}
