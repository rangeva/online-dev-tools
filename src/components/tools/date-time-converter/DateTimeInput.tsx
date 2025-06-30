
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, RotateCcw } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { exampleInputs } from './dateTimeConverterUtils';

interface DateTimeInputProps {
  inputValue: string;
  inputFormat: string;
  onInputChange: (value: string) => void;
  onFormatChange: (format: string) => void;
  onConvert: () => void;
  onSetCurrentTime: () => void;
  onClearAll: () => void;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  inputValue,
  inputFormat,
  onInputChange,
  onFormatChange,
  onConvert,
  onSetCurrentTime,
  onClearAll
}) => {
  const { t } = useI18n();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="input-date">{t('tools.dateTimeConverter.inputDateTime')}</Label>
          <Input
            id="input-date"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={`e.g., ${exampleInputs[inputFormat as keyof typeof exampleInputs]}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="input-format">{t('tools.dateTimeConverter.inputFormat')}</Label>
          <Select value={inputFormat} onValueChange={onFormatChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iso">ISO 8601 (e.g., 2024-01-15T10:30:00Z)</SelectItem>
              <SelectItem value="timestamp">Unix Timestamp (e.g., 1705312200)</SelectItem>
              <SelectItem value="milliseconds">Milliseconds (e.g., 1705312200000)</SelectItem>
              <SelectItem value="auto">Auto Detect</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button onClick={onConvert} className="flex-1 min-w-fit">
          <CalendarIcon className="h-4 w-4 mr-2" />
          {t('tools.dateTimeConverter.convertDate')}
        </Button>
        <Button onClick={onSetCurrentTime} variant="outline" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {t('tools.dateTimeConverter.useCurrentTime')}
        </Button>
        <Button onClick={onClearAll} variant="outline" className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          {t('tools.dateTimeConverter.clearAll')}
        </Button>
      </div>
    </>
  );
};

export default DateTimeInput;
