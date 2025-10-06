import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BusinessDetail from "./pages/BusinessDetail";
import ListingPage from "./pages/ListingPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import Signup from "./pages/AuthPages/SignUp";
import SignIn from "./pages/AuthPages/SignIn";
import ForgetPass from "./pages/AuthPages/ForgetPass";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgetPass />} />
            <Route path="/reset-password" element={<ForgetPass />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/list-business" element={<ListingPage />} />
              {/* Add more protected routes here */}
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
