
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "./image-converter/FileUpload";
import { ImagePreview } from "./image-converter/ImagePreview";
import { ConversionControls } from "./image-converter/ConversionControls";
import { ConvertedResult } from "./image-converter/ConvertedResult";
import { getMimeTypeAndQuality } from "./image-converter/utils";

const ImageFormatConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [quality, setQuality] = useState<number[]>([90]);
  const [isConverting, setIsConverting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File | null, url: string | null) => {
    setSelectedFile(file);
    setConvertedImage(null);
    setPreviewUrl(url);
  };

  const convertImage = async () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsConverting(true);
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        const { mimeType, qualityValue } = getMimeTypeAndQuality(outputFormat, quality);
        const dataUrl = canvas.toDataURL(mimeType, qualityValue);
        setConvertedImage(dataUrl);
        
        const formatName = outputFormat.toUpperCase();
        
        toast({
          title: "Conversion successful",
          description: `Image converted to ${formatName}`
        });
      };

      img.onerror = () => {
        toast({
          title: "Conversion failed",
          description: "Failed to load the image.",
          variant: "destructive"
        });
      };

      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion.",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const link = document.createElement('a');
    link.download = `converted-image.${outputFormat}`;
    link.href = convertedImage;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setConvertedImage(null);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Image Format Converter
          </CardTitle>
          <CardDescription>
            Convert images between different formats (PNG, JPEG, WebP, BMP, GIF) with quality control
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUpload 
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />

          {previewUrl && (
            <ImagePreview previewUrl={previewUrl} />
          )}

          {selectedFile && (
            <ConversionControls
              outputFormat={outputFormat}
              quality={quality}
              isConverting={isConverting}
              onFormatChange={setOutputFormat}
              onQualityChange={setQuality}
              onConvert={convertImage}
              onReset={reset}
            />
          )}

          {convertedImage && (
            <ConvertedResult
              convertedImage={convertedImage}
              outputFormat={outputFormat}
              onDownload={downloadImage}
            />
          )}

          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageFormatConverter;
