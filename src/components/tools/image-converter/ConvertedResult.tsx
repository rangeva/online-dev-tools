
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useI18n } from "@/i18n/context";

interface ConvertedResultProps {
  convertedImage: string;
  outputFormat: string;
  onDownload: () => void;
}

export const ConvertedResult = ({ convertedImage, outputFormat, onDownload }: ConvertedResultProps) => {
  const { t } = useI18n();

  return (
    <div className="space-y-4 border-t pt-6">
      <div className="flex items-center justify-between">
        <Label>{t('imageConverter.convertedImage')}</Label>
        <Button 
          onClick={onDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {t('imageConverter.download')}
        </Button>
      </div>
      <div className="max-w-md border rounded-lg p-4 bg-gray-50">
        <img 
          src={convertedImage} 
          alt="Converted" 
          className="max-w-full h-auto max-h-64 mx-auto rounded"
        />
      </div>
    </div>
  );
};
