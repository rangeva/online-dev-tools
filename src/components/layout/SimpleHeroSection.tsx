
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const SimpleHeroSection = () => {
  const { t } = useI18n();

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="p-3 bg-blue-600 rounded-xl">
          <Code className="h-8 w-8 text-white" />
        </div>
        <div className="text-left">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {t('header.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {t('header.subtitle')}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          {t('header.badges.free')}
        </Badge>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {t('header.badges.noSignup')}
        </Badge>
      </div>
      
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        {t('hero.subtitle')}
      </p>
    </div>
  );
};

export default SimpleHeroSection;
