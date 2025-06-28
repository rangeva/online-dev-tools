
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface ImageUploadControlProps {
  onImageUpload?: (file: File) => void;
}

export const ImageUploadControl = ({ onImageUpload }: ImageUploadControlProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/') && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        title="Upload Image"
        className="bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400"
      >
        <Upload className="w-4 h-4 mr-1.5" />
        Upload
      </Button>
    </div>
  );
};
