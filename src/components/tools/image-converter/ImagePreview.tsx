
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n/context";

interface ImagePreviewProps {
  previewUrl: string;
}

export const ImagePreview = ({ previewUrl }: ImagePreviewProps) => {
  const { t } = useI18n();

  return (
    <div className="space-y-2">
      <Label>{t('imageConverter.originalPreview')}</Label>
      <div className="max-w-md border rounded-lg p-4 bg-gray-50">
        <img 
          src={previewUrl} 
          alt="Original" 
          className="max-w-full h-auto max-h-64 mx-auto rounded"
        />
      </div>
    </div>
  );
};
