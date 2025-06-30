
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useI18n } from '@/contexts/I18nContext';

interface DateTimePickerProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  onDateSelect: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onUseSelected: () => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeChange,
  onUseSelected
}) => {
  const { t } = useI18n();

  return (
    <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <Label className="text-sm font-medium">{t('tools.dateTimeConverter.visualPicker')}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date-picker">{t('tools.dateTimeConverter.selectDate')}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>{t('tools.dateTimeConverter.pickDate')}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateSelect}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time-picker">{t('tools.dateTimeConverter.selectTime')}</Label>
          <Input
            id="time-picker"
            type="time"
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <Button 
        onClick={onUseSelected} 
        disabled={!selectedDate}
        className="w-full"
      >
        <Clock className="h-4 w-4 mr-2" />
        {t('tools.dateTimeConverter.useSelected')}
      </Button>
    </div>
  );
};

export default DateTimePicker;
