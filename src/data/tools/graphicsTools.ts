
import { 
  QrCode,
  Wifi,
  Palette,
  Camera,
  Brush,
  FileImage
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const graphicsTools: Tool[] = [
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate and download a QR code for a URL (or just plain text), and customize the background and foreground colors.",
    category: "graphics",
    icon: QrCode,
    component: toolComponents.QrCodeGenerator,
    tags: ["qr", "code", "generator", "url", "text", "download", "colors"]
  },
  {
    id: "wifi-qr-generator",
    name: "WiFi QR Code Generator",
    description: "Generate and download QR codes for quick connections to WiFi networks.",
    category: "graphics",
    icon: Wifi,
    component: toolComponents.WifiQrGenerator,
    tags: ["wifi", "qr", "code", "network", "connection", "wireless"]
  },
  {
    id: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate harmonious color palettes using color theory",
    category: "graphics",
    icon: Palette,
    component: toolComponents.ColorPaletteGenerator,
    tags: ["color", "palette", "harmony", "design"]
  },
  {
    id: "html-color-codes",
    name: "HTML Color Codes",
    description: "Pick colors, convert formats (HEX, RGB, HSL), and get color codes",
    category: "graphics",
    icon: Palette,
    component: toolComponents.HtmlColorCodes,
    tags: ["color", "hex", "rgb", "hsl", "picker"]
  },
  {
    id: "camera-recorder",
    name: "Camera Recorder",
    description: "Take a picture or record a video from your webcam or camera.",
    category: "graphics",
    icon: Camera,
    component: toolComponents.CameraRecorder,
    tags: ["camera", "webcam", "photo", "video", "record", "capture"]
  },
  {
    id: "painting-drawing-tool",
    name: "Painting & Drawing Tool",
    description: "Create digital art with brushes, shapes, and image editing tools. Upload images, draw with various brushes, use color picker, and save your artwork.",
    category: "graphics",
    icon: Brush,
    component: toolComponents.PaintingDrawingTool,
    tags: ["paint", "draw", "brush", "canvas", "art", "edit", "image", "digital art"]
  },
  {
    id: "image-format-converter",
    name: "Image Format Converter",
    description: "Convert images between different formats (PNG, JPEG, WebP, BMP) with quality control and download options.",
    category: "graphics",
    icon: FileImage,
    component: toolComponents.ImageFormatConverter,
    tags: ["image", "convert", "format", "png", "jpeg", "webp", "bmp", "quality"]
  }
];
