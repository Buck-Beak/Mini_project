"use client"
import React, { useState } from "react";
import { signUp } from "../functions/auth"
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(email, password,name);
    router.push('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
      <h1>SignUp</h1>
      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
        className="signup-button"
        onClick={handleSignUp}
      >
        SignUp
      </button>
      </div>
    </div>
  );
}
