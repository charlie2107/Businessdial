import React, { FormEvent, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(email, password, fullName); // send fullName
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      navigate("/");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Left Section - Signup Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
            <p className="text-gray-500 mb-6">
              Join us today and grow your business online.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70"
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <a href="/sign-in" className="text-blue-600 font-medium">
                  Sign In
                </a>
              </p>
            </form>
          </div>

          {/* Right Section - Info / Pricing */}
          <div className="bg-blue-50 flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-xl font-bold text-gray-800">Why Join Us?</h3>
            <ul className="mt-6 space-y-3 text-gray-700 text-sm text-left">
              <li>✔ Get discovered by thousands of local customers</li>
              <li>✔ Easy-to-use dashboard for your business</li>
              <li>✔ Secure & fast signup process</li>
              <li>✔ No hidden fees, lifetime access</li>
            </ul>
            <div className="mt-8 bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
              <p className="text-gray-500 text-sm">Simple Pricing</p>
              <p className="text-3xl font-bold text-blue-600">₹149</p>
              <p className="text-gray-500 text-sm">One-time signup</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
