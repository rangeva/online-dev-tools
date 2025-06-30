
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';
import { Badge } from '@/components/ui/badge';

interface AdvancedLanguageSelectorProps {
  variant?: 'default' | 'compact' | 'icon-only';
  showBadge?: boolean;
}

export const AdvancedLanguageSelector: React.FC<AdvancedLanguageSelectorProps> = ({ 
  variant = 'default',
  showBadge = false 
}) => {
  const { language, setLanguage, t } = useI18n();
  
  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === language);
  const popularLanguages = ['en', 'es', 'fr', 'de', 'pt'];
  const otherLanguages = SUPPORTED_LANGUAGES.filter(lang => !popularLanguages.includes(lang.code));

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as any);
    
    // Optional: Show toast notification
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('language-changed', { 
        detail: { language: newLanguage } 
      }));
    }
  };

  const renderTrigger = () => {
    switch (variant) {
      case 'icon-only':
        return (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Globe className="h-4 w-4" />
            <span className="sr-only">{t('common.selectLanguage', 'Select Language')}</span>
          </Button>
        );
      
      case 'compact':
        return (
          <Button variant="outline" size="sm" className="gap-1 h-8">
            <span className="text-base">{currentLanguage?.flag}</span>
            <span className="text-xs font-medium">{currentLanguage?.code.toUpperCase()}</span>
          </Button>
        );
      
      default:
        return (
          <Button variant="outline" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
            <span className="sm:hidden text-lg">{currentLanguage?.flag}</span>
            {showBadge && (
              <Badge variant="secondary" className="text-xs">
                {SUPPORTED_LANGUAGES.length}
              </Badge>
            )}
          </Button>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {renderTrigger()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Popular Languages */}
        <div className="px-2 py-1">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            {t('common.popularLanguages', 'Popular Languages')}
          </p>
        </div>
        {SUPPORTED_LANGUAGES
          .filter(lang => popularLanguages.includes(lang.code))
          .map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-3 cursor-pointer ${
                language === lang.code ? 'bg-accent' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-muted-foreground">{lang.name}</div>
              </div>
              {language === lang.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        
        {otherLanguages.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {t('common.otherLanguages', 'Other Languages')}
              </p>
            </div>
            {otherLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center gap-3 cursor-pointer ${
                  language === lang.code ? 'bg-accent' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
