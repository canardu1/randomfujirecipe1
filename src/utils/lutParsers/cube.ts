export const parseCubeLut = async (file: File): Promise<number[][]> => {
  const text = await file.text();
  const lines = text.split('\n');
  
  const lutData: number[][] = [];
  let readingData = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#') || !trimmed) continue;
    
    if (trimmed.startsWith('LUT_3D_SIZE')) {
      readingData = true;
      continue;
    }
    
    if (readingData) {
      const values = trimmed.split(/\s+/).map(Number);
      if (values.length === 3) {
        lutData.push(values);
      }
    }
  }
  
  return lutData;
}