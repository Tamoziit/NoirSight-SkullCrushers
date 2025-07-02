import { CivicAuthProvider as Web2AuthProvider } from "@civic/auth/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
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

const App = () => (
  <>
    <Web2AuthProvider clientId={civicAuthId}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/apikey" element={<ApiKeyPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/success" element={<PaymentCancel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </Web2AuthProvider>

    <Toaster />
  </>
);

export default App;