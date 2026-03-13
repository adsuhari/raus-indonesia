import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Cabins from "./pages/Cabins";
import CabinDetail from "./pages/CabinDetail";
import Checkout from "./pages/Checkout";
import Locations from "./pages/Locations";
import Experiences from "./pages/Experiences";
import Journal from "./pages/Journal";
import JournalArticle from "./pages/JournalArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cabins" element={<Cabins />} />
          <Route path="/cabins/:id" element={<CabinDetail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:id" element={<JournalArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
