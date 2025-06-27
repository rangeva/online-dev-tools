
import { RefObject } from "react";
import { CanvasSize } from "./useCanvasState";
import { SelectionArea } from "./useSelectionTool";

export const clearCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  saveCanvasState: () => void,
  onSuccess: (message: string) => void
) => {
  if (!canvasRef.current) return;
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  saveCanvasState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  onSuccess("The canvas has been cleared successfully.");
};

export const resizeCanvas = (
  newSize: CanvasSize,
  canvasRef: RefObject<HTMLCanvasElement>,
  onSuccess: (message: string) => void
) => {
  if (!canvasRef.current) return;
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Save current content
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Update canvas size
  canvas.width = newSize.width;
  canvas.height = newSize.height;
  
  // Fill with white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Restore content
  ctx.putImageData(imageData, 0, 0);
  
  onSuccess(`Canvas resized to ${newSize.width}x${newSize.height}`);
};

export const cropCanvas = (
  selection: SelectionArea,
  canvasRef: RefObject<HTMLCanvasElement>,
  saveCanvasState: () => void,
  setCanvasSize: (size: CanvasSize) => void,
  onSuccess: (message: string) => void
) => {
  if (!canvasRef.current) return;
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  saveCanvasState();
  
  // Get the selected area
  const imageData = ctx.getImageData(selection.startX, selection.startY, selection.width, selection.height);
  
  // Resize canvas to selection size
  canvas.width = selection.width;
  canvas.height = selection.height;
  
  // Fill with white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Put the cropped image
  ctx.putImageData(imageData, 0, 0);
  
  setCanvasSize({ width: selection.width, height: selection.height });
  
  onSuccess("The canvas has been cropped to the selected area.");
};

export const exportCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  format: 'png' | 'jpg' | 'gif' | 'bmp' = 'png',
  onSuccess: (message: string) => void
) => {
  if (!canvasRef.current) return;
  
  const canvas = canvasRef.current;
  
  // Convert format to MIME type
  let mimeType: string;
  let fileExtension: string;
  
  switch (format) {
    case 'jpg':
      mimeType = 'image/jpeg';
      fileExtension = 'jpg';
      break;
    case 'gif':
      mimeType = 'image/gif';
      fileExtension = 'gif';
      break;
    case 'bmp':
      mimeType = 'image/bmp';
      fileExtension = 'bmp';
      break;
    case 'png':
    default:
      mimeType = 'image/png';
      fileExtension = 'png';
      break;
  }
  
  // For JPEG, we need to handle transparency by adding a white background
  if (format === 'jpg') {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    
    // Fill with white background
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Draw the original canvas on top
    tempCtx.drawImage(canvas, 0, 0);
    
    const link = document.createElement('a');
    link.download = `artwork.${fileExtension}`;
    link.href = tempCanvas.toDataURL(mimeType, 0.9); // 0.9 quality for JPEG
    link.click();
  } else {
    const link = document.createElement('a');
    link.download = `artwork.${fileExtension}`;
    link.href = canvas.toDataURL(mimeType);
    link.click();
  }
  
  onSuccess(`Your artwork has been downloaded as ${format.toUpperCase()}.`);
};

export const uploadImage = (
  file: File,
  canvasRef: RefObject<HTMLCanvasElement>,
  saveCanvasState: () => void,
  onSuccess: (message: string) => void
) => {
  if (!canvasRef.current) return;
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      saveCanvasState();
      
      // Calculate new dimensions with max width of 1920
      let newWidth = img.width;
      let newHeight = img.height;
      
      if (newWidth > 1920) {
        const aspectRatio = newHeight / newWidth;
        newWidth = 1920;
        newHeight = Math.round(newWidth * aspectRatio);
      }
      
      // Create a temporary canvas for resizing
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCanvas.width = newWidth;
      tempCanvas.height = newHeight;
      
      // Draw resized image to temp canvas
      tempCtx.drawImage(img, 0, 0, newWidth, newHeight);
      
      // Draw the resized image to the main canvas
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      
      onSuccess(`Image has been loaded onto the canvas${newWidth !== img.width || newHeight !== img.height ? ` and resized to ${newWidth}x${newHeight}` : ''}.`);
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};
