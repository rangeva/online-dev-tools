
export const getFileSizeString = (file: File): string => {
  const sizes = ['Bytes', 'KB', 'MB'];
  let size = file.size;
  let i = 0;
  while (size >= 1024 && i < sizes.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(1)} ${sizes[i]}`;
};

export const getMimeTypeAndQuality = (outputFormat: string, quality: number[]) => {
  let mimeType: string;
  let qualityValue: number | undefined;

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

  return { mimeType, qualityValue };
};
