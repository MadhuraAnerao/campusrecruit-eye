
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";

// Pages
import Dashboard from "./pages/Dashboard";
import JobPostings from "./pages/JobPostings";
import HiringRounds from "./pages/HiringRounds";
import SelectedStudents from "./pages/SelectedStudents";
import CompanyProfile from "./pages/CompanyProfile";
import EmailTemplates from "./pages/EmailTemplates";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/job-postings" element={<JobPostings />} />
            <Route path="/hiring-rounds" element={<HiringRounds />} />
            <Route path="/selected-students" element={<SelectedStudents />} />
            <Route path="/emails" element={<EmailTemplates />} />
            <Route path="/profile" element={<CompanyProfile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
