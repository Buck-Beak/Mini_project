"use client";
import React, { useState } from "react";
import { signIn } from "../functions/auth";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/home");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-blue-900 text-white rounded-xl p-8 shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {/* Email Field */}
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field with Show/Hide Toggle */}
        <label className="block mt-3 mb-1">Password:</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-field pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mt-2 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-1" />
            Remember Me
          </label>
          <a href="#" className="text-blue-300 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 mt-4 w-full"
          onClick={handleLogin} 
        >
          Login
        </button>

        {/* Social Login Options */}
        <p className="text-center text-sm my-3">Or login with</p>
        <div className="flex justify-center gap-4">
          <button className="social-button">
            <FaGoogle className="text-red-500" /> Google
          </button>
          <button className="social-button">
            <FaGithub className="text-white" /> GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="#" className="text-blue-300 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Styles */}
      <style jsx>{`
        .input-field {
          background: white;
          color: black;
          border-radius: 8px;
          padding: 10px;
          border: none;
          outline: none;
          width: 100%;
          transition: all 0.3s;
        }
        .input-field:focus {
          border: 2px solid #3b82f6;
          box-shadow: 0px 0px 8px rgba(59, 130, 246, 0.4);
        }
        .social-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .social-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
