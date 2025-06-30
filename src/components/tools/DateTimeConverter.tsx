
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useI18n } from "@/contexts/I18nContext";
import DateTimePicker from "./date-time-converter/DateTimePicker";
import DateTimeInput from "./date-time-converter/DateTimeInput";
import ConvertedResults from "./date-time-converter/ConvertedResults";
import DateTimeConverterTips from "./date-time-converter/DateTimeConverterTips";
import { formatDate, convertDateTime, getRelativeTime } from "./date-time-converter/dateTimeConverterUtils";

const DateTimeConverter = () => {
  const { t } = useI18n();
  const now = new Date();
  const [inputValue, setInputValue] = useState(now.toISOString());
  const [inputFormat, setInputFormat] = useState("iso");
  const [results, setResults] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(now);
  const [selectedTime, setSelectedTime] = useState(format(now, "HH:mm"));
  const { toast } = useToast();

  const enhancedFormatDate = (date: Date) => {
    const basicFormats = formatDate(date);
    return {
      ...basicFormats,
      "Relative": getRelativeTime(date, t)
    };
  };

  const handleDateTimeSelect = () => {
    if (!selectedDate) return;
    
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours, minutes, 0, 0);
    
    setInputValue(combinedDate.toISOString());
    setInputFormat("iso");
    setResults(enhancedFormatDate(combinedDate));
    
    toast({
      title: t('tools.dateTimeConverter.dateTimeSelected'),
      description: t('tools.dateTimeConverter.inputUpdated')
    });
  };

  const handleConvert = () => {
    try {
      const date = convertDateTime(inputValue, inputFormat);
      setResults(enhancedFormatDate(date));
      toast({
        title: t('tools.dateTimeConverter.success'),
        description: t('tools.dateTimeConverter.successDescription')
      });
    } catch (error) {
      toast({
        title: t('tools.dateTimeConverter.error'),
        description: t('tools.dateTimeConverter.errorDescription'),
        variant: "destructive"
      });
    }
  };

  const setCurrentTime = () => {
    const now = new Date();
    setInputValue(now.toISOString());
    setInputFormat("iso");
    setResults(enhancedFormatDate(now));
    setSelectedDate(now);
    setSelectedTime(format(now, "HH:mm"));
    toast({
      title: t('tools.dateTimeConverter.currentTimeSet'),
      description: t('tools.dateTimeConverter.currentTimeDescription')
    });
  };

  const clearAll = () => {
    setInputValue("");
    setResults({});
    setInputFormat("iso");
    setSelectedDate(undefined);
    setSelectedTime("12:00");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t('tools.dateTimeConverter.copied'),
      description: t('tools.dateTimeConverter.copiedDescription')
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <CardTitle>{t('tools.dateTimeConverter.title')}</CardTitle>
          </div>
          <CardDescription>
            {t('tools.dateTimeConverter.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <DateTimePicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeChange={setSelectedTime}
            onUseSelected={handleDateTimeSelect}
          />

          <DateTimeInput
            inputValue={inputValue}
            inputFormat={inputFormat}
            onInputChange={setInputValue}
            onFormatChange={setInputFormat}
            onConvert={handleConvert}
            onSetCurrentTime={setCurrentTime}
            onClearAll={clearAll}
          />

          <ConvertedResults
            results={results}
            onCopyToClipboard={copyToClipboard}
          />

          <DateTimeConverterTips />
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeConverter;
