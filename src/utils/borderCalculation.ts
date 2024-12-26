// Scale factor for preview border (makes it appear smaller in preview)
const PREVIEW_SCALE_FACTOR = 0.4; // This will make the preview border 40% of the export size

// Calculate the preview border width (smaller for UI)
export const calculatePreviewBorderWidth = (exportWidth: number): number => {
  return Math.round(exportWidth * PREVIEW_SCALE_FACTOR);
};

// Calculate the actual border width for export (original size)
export const calculateExportBorderWidth = (previewWidth: number): number => {
  return Math.round(previewWidth / PREVIEW_SCALE_FACTOR);
};