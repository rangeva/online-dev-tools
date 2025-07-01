
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/contexts/I18nContext";
import { LanguageRoute } from "@/components/routing/LanguageRoute";
import { LanguageRedirect } from "@/components/i18n/LanguageRedirect";
import Index from "./pages/Index";
import ToolPage from "./pages/ToolPage";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const AppContent = () => {
  console.log('AppContent - Rendering with router context available');
  
  return (
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageRedirect />
        <Routes>
          {/* Default English routes (no language prefix) */}
          <Route path="/" element={<Index />} />
          <Route path="/tool/:toolId" element={<ToolPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          
          {/* Language-prefixed routes */}
          <Route path="/:lang/*" element={<LanguageRoute />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </I18nProvider>
  );
};

const App = () => {
  console.log('App - Rendering main app component');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
