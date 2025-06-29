
export interface SupportedFormat {
  value: string;
  label: string;
  hasQuality: boolean;
}

export interface ImageConverterState {
  selectedFile: File | null;
  previewUrl: string | null;
  convertedImage: string | null;
  outputFormat: string;
  quality: number[];
  isConverting: boolean;
}
