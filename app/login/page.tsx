"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { betterAuthClient } from "../lib/integrations/better-auth";

const LoginPage = () => {
  const router = useRouter();
  const [loginCreds, setLoginCreds] = useState({ username: "", password: "" });
  const [registerCreds, setRegisterCreds] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!loginCreds.username || !loginCreds.password) {
      setError("Please fill in all login fields.");
      return;
    }
    try {
      setError(null);
      await betterAuthClient.signIn.username({
        username: loginCreds.username,
        password: loginCreds.password,
      });
      router.push("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed:", err);
    }
  };

  const handleRegister = async () => {
    if (
      !registerCreds.username ||
      !registerCreds.password ||
      !registerCreds.email ||
      !registerCreds.name
    ) {
      setError("Please fill in all registration fields.");
      return;
    }
    try {
      setError(null);
      const response = await betterAuthClient.signUp.email({
        email: registerCreds.email,
        password: registerCreds.password,
        username: registerCreds.username,
        name: registerCreds.name,
      });
      if (response) {
        router.push("/");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login</h2>
          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="login-username">
                Username
              </label>
              <input
                id="login-username"
                type="text"
                value={loginCreds.username}
                onChange={(e) =>
                  setLoginCreds({ ...loginCreds, username: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={loginCreds.password}
                onChange={(e) =>
                  setLoginCreds({ ...loginCreds, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </button>
            <p className="text-sm text-indigo-600 hover:underline text-center cursor-pointer">
              Forgot your password?
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="register-email">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={registerCreds.email}
                onChange={(e) =>
                  setRegisterCreds({ ...registerCreds, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="register-name">
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                value={registerCreds.name}
                onChange={(e) =>
                  setRegisterCreds({ ...registerCreds, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="register-username">
                Username
              </label>
              <input
                id="register-username"
                type="text"
                value={registerCreds.username}
                onChange={(e) =>
                  setRegisterCreds({ ...registerCreds, username: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                value={registerCreds.password}
                onChange={(e) =>
                  setRegisterCreds({ ...registerCreds, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              onClick={handleRegister}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
