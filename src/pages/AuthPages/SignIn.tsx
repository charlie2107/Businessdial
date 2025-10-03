import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle login logic here
    console.log("Sign In:", { email, password });
  };

  return (
       <div className="min-h-screen bg-background">
          <Header />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign in to continue managing your business
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <div className="border-t w-full border-gray-200"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="border-t w-full border-gray-200"></div>
        </div>

        {/* Social Login */}
        <div className="flex flex-col space-y-3">
          <button className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50 transition">
            <img src="https://www.svgrepo.com/show/448234/facebook.svg" alt="Facebook" className="h-5 w-5 mr-2" />
            Sign in with Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
          <Footer />
          </div>
  );
};

export default SignIn;
