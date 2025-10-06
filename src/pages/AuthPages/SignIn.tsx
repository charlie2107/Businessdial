import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PageLoader } from "@/components/ui/loader";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      
      navigate("/");
    } catch (err: any) {
      let message = "An unexpected error occurred. Please try again.";

      if (err.response) {
        // Server responded but with an error code
        message =
          err.response.data?.message ||
          `Server error: ${err.response.statusText}`;
      } else if (err.request) {
        // Request made but no response
        message = "Unable to connect to the server. Please check your network.";
      } else {
        // Other errors
        message = err.message;
      }

      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <PageLoader />
        </div>
      )}

      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-center mb-6 text-sm md:text-base">
            Sign in to manage your business and services
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="text-red-600 bg-red-50 border border-red-200 p-2 rounded text-sm text-center">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-70"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center justify-center">
            <div className="border-t w-full border-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="border-t w-full border-gray-200"></div>
          </div>

          {/* Social Login */}
          {/* <div className="flex flex-col space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/448234/facebook.svg"
                alt="Facebook"
                className="h-5 w-5 mr-2"
              />
              Sign in with Facebook
            </button>
          </div> */}

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
