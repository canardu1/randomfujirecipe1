// Analyze the processed image data to extract color transformation parameters
export const analyzeImageData = (original: ImageData, processed: ImageData) => {
  let totalR = 0, totalG = 0, totalB = 0;
  let totalBrightness = 0;
  let totalContrast = 0;
  let totalSaturation = 0;

  for (let i = 0; i < original.data.length; i += 4) {
    const oR = original.data[i];
    const oG = original.data[i + 1];
    const oB = original.data[i + 2];
    
    const pR = processed.data[i];
    const pG = processed.data[i + 1];
    const pB = processed.data[i + 2];

    // Calculate color shifts
    totalR += pR - oR;
    totalG += pG - oG;
    totalB += pB - oB;

    // Calculate brightness change
    const oBrightness = (oR + oG + oB) / 3;
    const pBrightness = (pR + pG + pB) / 3;
    totalBrightness += pBrightness - oBrightness;

    // Calculate contrast change
    const oContrast = Math.abs(oBrightness - 128);
    const pContrast = Math.abs(pBrightness - 128);
    totalContrast += pContrast - oContrast;

    // Calculate saturation change
    const oSat = Math.max(oR, oG, oB) - Math.min(oR, oG, oB);
    const pSat = Math.max(pR, pG, pB) - Math.min(pR, pG, pB);
    totalSaturation += pSat - oSat;
  }

  const pixelCount = original.data.length / 4;

  return {
    temperature: Math.round((totalR - totalB) / pixelCount),
    tint: Math.round((totalG - ((totalR + totalB) / 2)) / pixelCount),
    brightness: Math.round(totalBrightness / pixelCount),
    contrast: Math.round(totalContrast / pixelCount),
    saturation: Math.round(totalSaturation / pixelCount)
  };
};