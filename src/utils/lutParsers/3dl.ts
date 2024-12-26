export const parse3dlLut = async (file: File): Promise<number[][]> => {
  const text = await file.text();
  const lines = text.split('\n');
  
  const lutData: number[][] = [];
  let readingData = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#') || !trimmed) continue;
    
    // Skip header lines
    if (trimmed.match(/^[\d\s]+$/) && !readingData) {
      readingData = true;
      continue;
    }
    
    if (readingData) {
      // 3DL format has integer values from 0-1023
      const values = trimmed.split(/\s+/)
        .map(Number)
        .map(v => v / 1023); // Normalize to 0-1 range
      
      if (values.length === 3) {
        lutData.push(values);
      }
    }
  }
  
  return lutData;
}