export const parseCubeLut = async (file: File): Promise<number[][]> => {
  const text = await file.text();
  const lines = text.split('\n');
  
  const lutData: number[][] = [];
  let readingData = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip comments and empty lines
    if (trimmed.startsWith('#') || !trimmed) continue;
    
    // Start reading data after encountering LUT_3D_SIZE
    if (trimmed.startsWith('LUT_3D_SIZE')) {
      readingData = true;
      continue;
    }
    
    if (readingData) {
      // Parse RGB values
      const values = trimmed.split(/\s+/).map(Number);
      if (values.length === 3) {
        lutData.push(values);
      }
    }
  }
  
  return lutData;
}