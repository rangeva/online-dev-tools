
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getFileSizeString } from "./utils";

interface FileUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null, previewUrl: string | null) => void;
}

export const FileUpload = ({ selectedFile, onFileSelect }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive"
        });
        return;
      }
      
      const url = URL.createObjectURL(file);
      onFileSelect(file, url);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Select Image</Label>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Choose File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        {selectedFile && (
          <div className="text-sm text-muted-foreground">
            {selectedFile.name} ({getFileSizeString(selectedFile)})
          </div>
        )}
      </div>
    </div>
  );
};
