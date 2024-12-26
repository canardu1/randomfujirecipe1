import { XmpTag, XmpDocument } from 'xmp-js';
import { Recipe } from '../../types/Recipe';

export class XmpBuilder {
  private doc: XmpDocument;

  constructor() {
    this.doc = new XmpDocument();
    this.doc.setNamespace('crs', 'http://ns.adobe.com/camera-raw-settings/1.0/');
  }

  private addTag(name: string, value: string | number | boolean): void {
    this.doc.appendTag(new XmpTag('crs:' + name, String(value)));
  }

  private mapGrainSettings(recipe: Recipe) {
    const grainMap = {
      'Off': { amount: 0, size: 25 },
      'Weak': { amount: 25, size: recipe.grainSize === 'Small' ? 25 : 50 },
      'Strong': { amount: 50, size: recipe.grainSize === 'Small' ? 25 : 50 }
    };
    return grainMap[recipe.grainEffect];
  }

  buildFromRecipe(recipe: Recipe): string {
    // Basic metadata
    this.addTag('PresetType', 'User');
    this.addTag('Name', recipe.name);
    this.addTag('ProcessVersion', '15.0');
    this.addTag('HasSettings', 'True');

    // White balance
    this.addTag('WhiteBalance', 'Custom');
    this.addTag('Temperature', recipe.whiteBalanceShift.red * 10);
    this.addTag('Tint', recipe.whiteBalanceShift.blue * 10);

    // Tone adjustments
    this.addTag('Exposure2012', parseFloat(recipe.exposureCompensation) || 0);
    this.addTag('Contrast2012', recipe.highlight * 5);
    this.addTag('Highlights2012', recipe.highlight * 25);
    this.addTag('Shadows2012', recipe.shadow * 25);
    this.addTag('Whites2012', recipe.highlight * 15);
    this.addTag('Blacks2012', recipe.shadow * 15);

    // Color adjustments
    this.addTag('Clarity2012', recipe.sharpness * 10);
    this.addTag('Vibrance', recipe.color * 10);
    this.addTag('Saturation', recipe.color * 8);

    // Grain
    const grain = this.mapGrainSettings(recipe);
    this.addTag('GrainAmount', grain.amount);
    this.addTag('GrainSize', grain.size);

    // Film simulation specific
    this.addTag('ConvertToGrayscale', 
      recipe.filmSimulation === 'ACROS' || 
      recipe.filmSimulation === 'Monochrome');

    // Generate XMP
    return this.doc.toString();
  }
}