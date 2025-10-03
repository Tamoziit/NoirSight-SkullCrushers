import { useUser, CivicAuthProvider as Web2AuthProvider } from "@civic/auth/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/landing/Landing";
import NotFound from "./pages/NotFound";
import Playground from "./components/Playground";
import PaymentSuccess from "./pages/payments/PaymentSuccess";
import PaymentCancel from "./pages/payments/PaymentCancel";
import Documentation from "./pages/docs/Documentation";
import ApiKeyPage from "./pages/apiKey/ApiKeyPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";

const queryClient = new QueryClient();
const civicAuthId = import.meta.env.VITE_CIVIC_AUTH_ID;

function App() {
  const { user } = useUser();

  return (
    <>
      <Web2AuthProvider clientId={civicAuthId}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Sonner />
            <Routes>
              <Route path="/" element={user ? <Navigate to="/home" /> : <Landing />} />
              <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
              <Route path="/playground" element={user ? <Playground /> : <Navigate to="/" />} />
              <Route path="/docs" element={user ? <Documentation /> : <Navigate to="/" />} />
              <Route path="/apikey" element={user ? <ApiKeyPage /> : <Navigate to="/" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel/:sessionId" element={<PaymentCancel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </Web2AuthProvider>

      <Toaster />
    </>
  )
};

export default App;