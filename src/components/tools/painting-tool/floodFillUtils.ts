
import { hexToRgb } from "./colorUtils";

export const floodFill = (
  canvas: HTMLCanvasElement,
  startX: number,
  startY: number,
  fillColor: string
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  // Convert fill color to RGB
  const fillRgb = hexToRgb(fillColor);
  
  // Get the color at the starting point
  const startIndex = (startY * width + startX) * 4;
  const startR = data[startIndex];
  const startG = data[startIndex + 1];
  const startB = data[startIndex + 2];
  const startA = data[startIndex + 3];

  // Don't fill if the target color is the same as fill color
  if (startR === fillRgb.r && startG === fillRgb.g && startB === fillRgb.b) {
    return;
  }

  // Flood fill algorithm using a stack
  const stack = [[startX, startY]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    const key = `${x},${y}`;
    
    if (visited.has(key) || x < 0 || x >= width || y < 0 || y >= height) {
      continue;
    }

    const index = (y * width + x) * 4;
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const a = data[index + 3];

    // Check if this pixel matches the start color
    if (r === startR && g === startG && b === startB && a === startA) {
      visited.add(key);
      
      // Fill this pixel
      data[index] = fillRgb.r;
      data[index + 1] = fillRgb.g;
      data[index + 2] = fillRgb.b;
      data[index + 3] = 255; // Full opacity

      // Add neighboring pixels to stack
      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }
  }

  // Put the modified image data back to canvas
  ctx.putImageData(imageData, 0, 0);
};
