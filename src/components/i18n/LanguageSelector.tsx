
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';
import { createMultilingualUrl, getLanguageFromPath } from '@/utils/multilingualRouting';

export const LanguageSelector: React.FC = () => {
  const { language, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: string) => {
    const { cleanPath } = getLanguageFromPath(location.pathname);
    const newUrl = createMultilingualUrl(cleanPath, newLanguage as any);
    
    console.log('LanguageSelector - Changing language to:', newLanguage);
    console.log('LanguageSelector - Current path:', location.pathname);
    console.log('LanguageSelector - Clean path:', cleanPath);
    console.log('LanguageSelector - New URL:', newUrl);
    
    // Navigate to the new URL - I18nProvider will handle the language state update
    navigate(newUrl, { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-2 ${language === lang.code ? 'bg-accent' : ''}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.nativeName}</span>
            {language === lang.code && (
              <span className="text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
