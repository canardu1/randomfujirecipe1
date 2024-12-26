export const ACCEPTED_RAW_FORMATS = [
  'image/x-adobe-dng',  // DNG files
  'image/x-canon-cr2',  // Canon RAW
  'image/x-nikon-nef',  // Nikon RAW
  'image/x-sony-arw',   // Sony RAW
  'image/x-fuji-raf',   // Fujifilm RAW
  'image/tiff',         // Some RAW files are detected as TIFF
];

export const ACCEPTED_PREVIEW_FORMATS = [
  'image/jpeg',
  'image/png'
];

export const isValidRawFile = (file: File): boolean => {
  return ACCEPTED_RAW_FORMATS.includes(file.type) || 
         file.name.toLowerCase().endsWith('.dng') ||
         file.name.toLowerCase().endsWith('.raf');
};

export const isValidPreviewFile = (file: File): boolean => {
  return ACCEPTED_PREVIEW_FORMATS.includes(file.type);
};