
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertSecondsToTime } from './utils';
import { useI18n } from '@/contexts/I18nContext';

const SecondsConverter = () => {
  const { t } = useI18n();
  const [secondsToConvert, setSecondsToConvert] = useState('90061');
  const [timeConversionResult, setTimeConversionResult] = useState<any>(null);

  const handleConvertSecondsToTime = () => {
    const totalSeconds = parseInt(secondsToConvert);
    if (isNaN(totalSeconds)) return;
    
    const result = convertSecondsToTime(totalSeconds);
    setTimeConversionResult(result);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{t('tools.epochConverter.secondsConverter')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="90061"
            value={secondsToConvert}
            onChange={(e) => setSecondsToConvert(e.target.value)}
            className="flex-1 text-sm"
          />
          <Button onClick={handleConvertSecondsToTime} className="w-full sm:w-auto" size="sm">
            {t('tools.epochConverter.convert')}
          </Button>
        </div>

        {timeConversionResult && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-lg md:text-2xl font-bold break-words">
                  {timeConversionResult.days} {t('tools.epochConverter.days')}, {timeConversionResult.hours} {t('tools.epochConverter.hours')}, {timeConversionResult.minutes} {t('tools.epochConverter.minutes')}, {timeConversionResult.seconds} {t('tools.epochConverter.seconds')}
                </div>
                <div className="text-sm text-gray-600">
                  {t('tools.epochConverter.total')}: {timeConversionResult.total.toLocaleString()} {t('tools.epochConverter.seconds')}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default SecondsConverter;
