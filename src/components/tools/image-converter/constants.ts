
import { SupportedFormat } from "./types";

export const supportedFormats: SupportedFormat[] = [
  { value: "png", label: "PNG", hasQuality: false },
  { value: "jpeg", label: "JPEG", hasQuality: true },
  { value: "jpg", label: "JPG", hasQuality: true },
  { value: "webp", label: "WebP", hasQuality: true },
  { value: "bmp", label: "BMP", hasQuality: false },
  { value: "gif", label: "GIF", hasQuality: false }
];
