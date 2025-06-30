
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';

interface ConvertedResultsProps {
  results: Record<string, string>;
  onCopyToClipboard: (text: string) => void;
}

const ConvertedResults: React.FC<ConvertedResultsProps> = ({
  results,
  onCopyToClipboard
}) => {
  const { t } = useI18n();

  if (Object.keys(results).length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t('tools.dateTimeConverter.convertedFormats')}</h3>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {Object.keys(results).length} {t('tools.dateTimeConverter.formatsAvailable')}
        </div>
      </div>
      <div className="grid gap-3">
        {Object.entries(results).map(([format, value]) => (
          <div key={format} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-1">
                {format}
              </div>
              <div className="font-mono text-sm text-slate-900 dark:text-slate-100 break-all">
                {value}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopyToClipboard(value)}
              className="ml-3 flex-shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConvertedResults;
