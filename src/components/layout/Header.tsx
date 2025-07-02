
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { useI18n } from "@/contexts/I18nContext";
import { createMultilingualUrl } from "@/utils/multilingualRouting";

const Header = () => {
  const { t, language } = useI18n();
  const homeUrl = createMultilingualUrl('/', language);

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={homeUrl} className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {t('header.title')}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('header.subtitle')}
              </p>
            </div>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {t('header.badges.free')}
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {t('header.badges.noSignup')}
              </Badge>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
