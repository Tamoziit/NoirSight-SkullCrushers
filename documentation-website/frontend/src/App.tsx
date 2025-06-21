
import { CivicAuthProvider as Web2AuthProvider } from "@civic/auth/react";
import { CivicAuthProvider as Web3AuthProvider } from "@civic/auth-web3/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Playground from "./components/Playground";
import Documentation from "./components/Documentation";


const queryClient = new QueryClient();

const App = () => (
  <Web2AuthProvider clientId="d22021c1-9343-4541-bcc6-646f370a9a2f">
    <Web3AuthProvider clientId="d22021c1-9343-4541-bcc6-646f370a9a2f">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Index />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  </Web2AuthProvider>
);

export default App;
