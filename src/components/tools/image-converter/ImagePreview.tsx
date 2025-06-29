
import { Label } from "@/components/ui/label";

interface ImagePreviewProps {
  previewUrl: string;
}

export const ImagePreview = ({ previewUrl }: ImagePreviewProps) => {
  return (
    <div className="space-y-2">
      <Label>Original Image Preview</Label>
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
