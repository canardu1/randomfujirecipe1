declare module 'exif-js' {
  interface ExifTags {
    Make?: string;
    Model?: string;
    FocalLength?: number;
    FNumber?: number;
    ExposureTime?: number;
    ISOSpeedRatings?: number;
    DateTimeOriginal?: string;
    LensModel?: string;
  }

  interface ExifStatic {
    getData(img: HTMLImageElement, callback: () => void): void;
    getAllTags(img: HTMLImageElement): ExifTags;
  }

  const EXIF: ExifStatic;
  export default EXIF;
}