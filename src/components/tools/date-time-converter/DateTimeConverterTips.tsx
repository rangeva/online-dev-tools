
import React from 'react';
import { useI18n } from '@/contexts/I18nContext';

const DateTimeConverterTips: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
      <div><strong>{t('tools.dateTimeConverter.tips')}</strong></div>
      <div>• {t('tools.dateTimeConverter.tip1')}</div>
      <div>• {t('tools.dateTimeConverter.tip2')}</div>
      <div>• {t('tools.dateTimeConverter.tip3')}</div>
      <div>• {t('tools.dateTimeConverter.tip4')}</div>
    </div>
  );
};

export default DateTimeConverterTips;
