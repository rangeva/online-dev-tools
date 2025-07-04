
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { FileUpload } from "./FileUpload";
import { ImagePreview } from "./ImagePreview";
import { ConversionControls } from "./ConversionControls";
import { ConvertedResult } from "./ConvertedResult";
import { useImageConverter } from "./hooks/useImageConverter";

export const ImageConverter = () => {
  const {
    selectedFile,
    previewUrl,
    convertedImage,
    outputFormat,
    quality,
    isConverting,
    canvasRef,
    handleFileSelect,
    convertImage,
    downloadImage,
    reset,
    setOutputFormat,
    setQuality
  } = useImageConverter();

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
