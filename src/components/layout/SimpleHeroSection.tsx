
import { useI18n } from "@/i18n/context";
import { LanguageSelector } from "@/components/LanguageSelector";

const SimpleHeroSection = () => {
  const { t } = useI18n();

  return (
    <div className="text-center mb-8">
      <div className="flex justify-end mb-4">
        <LanguageSelector />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        {t('hero.title')}
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        {t('hero.subtitle', {
          openSource: (
            <a 
              href="https://github.com/rangeva/online-dev-tools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('hero.openSource')}
            </a>
          )
        })}
      </p>
    </div>
  );
};

export default SimpleHeroSection;
