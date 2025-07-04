
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/i18n/context";
import { getMimeTypeAndQuality } from "../utils";

export const useImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [quality, setQuality] = useState<number[]>([90]);
  const [isConverting, setIsConverting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { t } = useI18n();

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
          title: t('imageConverter.success'),
          description: t('imageConverter.successDesc', { format: formatName })
        });
      };

      img.onerror = () => {
        toast({
          title: t('imageConverter.failed'),
          description: t('imageConverter.failedLoad'),
          variant: "destructive"
        });
      };

      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      toast({
        title: t('imageConverter.failed'),
        description: t('imageConverter.failedError'),
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

  return {
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
  };
};
