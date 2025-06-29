import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, RotateCcw, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageFormatConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [quality, setQuality] = useState<number[]>([90]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const supportedFormats = [
    { value: "png", label: "PNG", hasQuality: false },
    { value: "jpeg", label: "JPEG", hasQuality: true },
    { value: "jpg", label: "JPG", hasQuality: true },
    { value: "webp", label: "WebP", hasQuality: true },
    { value: "bmp", label: "BMP", hasQuality: false },
    { value: "gif", label: "GIF", hasQuality: false }
  ];

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
      
      setSelectedFile(file);
      setConvertedImage(null);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Clean up old preview URL
      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }
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

        let mimeType: string;
        let qualityValue: number | undefined;

        // Handle different output formats
        switch (outputFormat) {
          case 'jpg':
            mimeType = 'image/jpeg';
            qualityValue = quality[0] / 100;
            break;
          case 'jpeg':
            mimeType = 'image/jpeg';
            qualityValue = quality[0] / 100;
            break;
          case 'webp':
            mimeType = 'image/webp';
            qualityValue = quality[0] / 100;
            break;
          case 'png':
            mimeType = 'image/png';
            qualityValue = undefined;
            break;
          case 'bmp':
            mimeType = 'image/bmp';
            qualityValue = undefined;
            break;
          case 'gif':
            mimeType = 'image/gif';
            qualityValue = undefined;
            break;
          default:
            mimeType = 'image/png';
            qualityValue = undefined;
        }

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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileSizeString = (file: File) => {
    const sizes = ['Bytes', 'KB', 'MB'];
    let size = file.size;
    let i = 0;
    while (size >= 1024 && i < sizes.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${sizes[i]}`;
  };

  const selectedFormatConfig = supportedFormats.find(f => f.value === outputFormat);
  const showQualityControl = selectedFormatConfig?.hasQuality;

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
          {/* File Upload */}
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

          {/* Image Preview */}
          {previewUrl && (
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
          )}

          {selectedFile && (
            <>
              {/* Output Format Selection */}
              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quality Control */}
              {showQualityControl && (
                <div className="space-y-2">
                  <Label>Quality: {quality[0]}%</Label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={100}
                    min={1}
                    step={1}
                    className="w-64"
                  />
                </div>
              )}

              {/* Convert Button */}
              <div className="flex gap-2">
                <Button 
                  onClick={convertImage}
                  disabled={isConverting}
                  className="flex items-center gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  {isConverting ? "Converting..." : "Convert Image"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={reset}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </>
          )}

          {/* Preview and Download */}
          {convertedImage && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <Label>Converted Image</Label>
                <Button 
                  onClick={downloadImage}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
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
          )}

          {/* Hidden Canvas */}
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageFormatConverter;
