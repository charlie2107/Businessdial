import React, { FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ForgetPass: React.FC = () => {
  const location = useLocation();
  const isResetMode = location.pathname === "/reset-password";
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const { forgotPassword, resetPassword } = useAuth();
  const { toast } = useToast();

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await forgotPassword(email);
      setResetSent(true);
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to process request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
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
      await resetPassword(token, password);
      toast({
        title: "Success",
        description: "Password has been reset successfully",
      });
      // Redirect to login page after successful reset
      window.location.href = "/sign-in";
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to reset password",
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
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isResetMode ? "Reset Your Password" : "Forgot Password"}
          </h2>
          <p className="text-gray-500 text-center mb-6">
            {isResetMode 
              ? "Enter your reset token and new password" 
              : "Enter your email to receive password reset instructions"}
          </p>

          {/* Form */}
          {isResetMode ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reset Token *
                </label>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter the token received in your email"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70"
              >
                {isSubmitting ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {resetSent ? (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800">
                    Password reset instructions have been sent to your email. Please check your inbox.
                  </p>
                </div>
              ) : (
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
              )}

              {!resetSent && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70"
                >
                  {isSubmitting ? "Sending Instructions..." : "Send Reset Instructions"}
                </button>
              )}
            </form>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{" "}
            <Link to="/sign-in" className="text-blue-600 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPass;