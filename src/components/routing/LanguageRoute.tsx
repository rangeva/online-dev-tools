
import { useParams, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { SUPPORTED_LANGUAGES } from "@/i18n/config";
import { getLanguageFromPath } from "@/utils/multilingualRouting";
import Index from "@/pages/Index";
import ToolPage from "@/pages/ToolPage";
import CategoryPage from "@/pages/CategoryPage";
import NotFound from "@/pages/NotFound";

export const LanguageRoute = () => {
  const { lang, '*': remainingPath } = useParams();
  const { setLanguage } = useI18n();

  // Check if the language is supported
  const isValidLanguage = lang && SUPPORTED_LANGUAGES.some(l => l.code === lang);

  useEffect(() => {
    if (isValidLanguage) {
      console.log('LanguageRoute - Setting language to:', lang);
      setLanguage(lang as any);
    }
  }, [lang, isValidLanguage, setLanguage]);

  // If language is not supported, redirect to 404
  if (!isValidLanguage) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tool/:toolId" element={<ToolPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
