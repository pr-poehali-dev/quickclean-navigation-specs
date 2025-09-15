
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import CleanerDashboard from "./pages/CleanerDashboard";
import Chat from "./pages/Chat";
import ReviewOrder from "./pages/ReviewOrder";
import AdminAnalytics from "./pages/AdminAnalytics";
import Notifications from "./pages/Notifications";
import ProfileSettings from "./pages/ProfileSettings";
import CleanerSchedule from "./pages/CleanerSchedule";
import CleanerEarnings from "./pages/CleanerEarnings";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId/chat" element={<Chat />} />
          <Route path="/orders/:orderId/review" element={<ReviewOrder />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/cleaner/dashboard" element={<CleanerDashboard />} />
          <Route path="/cleaner/schedule" element={<CleanerSchedule />} />
          <Route path="/cleaner/earnings" element={<CleanerEarnings />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;