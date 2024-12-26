import { Recipe } from '../../types/Recipe';
import { filmSimulationProfiles } from './colorProfiles';

const XMP_TEMPLATE = `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 7.0-c000 1.000000, 0000/00/00-00:00:00">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
   xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
   crs:PresetType="User"
   crs:Version="15.0"
   crs:ProcessVersion="15.0"
   crs:UUID="\${uuid}"
   crs:Name="\${name}"
   crs:WhiteBalance="Custom"
   crs:Temperature="\${temperature}"
   crs:Tint="\${tint}"
   crs:Exposure2012="\${exposure}"
   crs:Contrast2012="\${contrast}"
   crs:Highlights2012="\${highlights}"
   crs:Shadows2012="\${shadows}"
   crs:Whites2012="\${whites}"
   crs:Blacks2012="\${blacks}"
   crs:Clarity2012="\${clarity}"
   crs:Vibrance="\${vibrance}"
   crs:Saturation="\${saturation}"
   crs:ParametricShadows="\${parametricShadows}"
   crs:ParametricDarks="\${parametricDarks}"
   crs:ParametricLights="\${parametricLights}"
   crs:ParametricHighlights="\${parametricHighlights}"
   crs:GrainAmount="\${grainAmount}"
   crs:GrainSize="\${grainSize}"
   crs:GrainFrequency="\${grainFrequency}"
   crs:ConvertToGrayscale="\${convertToGrayscale}"
   crs:CameraProfile="\${cameraProfile}"
   crs:HasSettings="True"/>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const mapGrainSettings = (recipe: Recipe) => {
  const grainMap = {
    'Off': { amount: 0, size: 25, frequency: 50 },
    'Weak': { amount: 25, size: recipe.grainSize === 'Small' ? 25 : 50, frequency: 50 },
    'Strong': { amount: 50, size: recipe.grainSize === 'Small' ? 25 : 50, frequency: 50 }
  };
  return grainMap[recipe.grainEffect];
};

export const generateXMPContent = (recipe: Recipe): string => {
  const profile = filmSimulationProfiles[recipe.filmSimulation];
  const grain = mapGrainSettings(recipe);
  const isMonochrome = recipe.filmSimulation === 'ACROS' || recipe.filmSimulation === 'Monochrome';

  // Calculate values based on recipe and profile
  const values = {
    uuid: generateUUID(),
    name: recipe.name,
    temperature: Math.round(recipe.whiteBalanceShift.red * 10 + profile.adjustments.temperature * 10),
    tint: Math.round(recipe.whiteBalanceShift.blue * 10 + profile.adjustments.tint * 10),
    exposure: parseFloat(recipe.exposureCompensation) || 0,
    contrast: recipe.highlight * 5 + profile.adjustments.contrast,
    highlights: recipe.highlight * 25 + profile.adjustments.highlights,
    shadows: recipe.shadow * 25 + profile.adjustments.shadows,
    whites: recipe.highlight * 15,
    blacks: recipe.shadow * 15,
    clarity: recipe.sharpness * 10,
    vibrance: recipe.color * 10 + profile.adjustments.vibrance,
    saturation: recipe.color * 8 + profile.adjustments.saturation,
    parametricShadows: recipe.shadow * 10,
    parametricDarks: recipe.shadow * 5,
    parametricLights: recipe.highlight * 5,
    parametricHighlights: recipe.highlight * 10,
    grainAmount: grain.amount,
    grainSize: grain.size,
    grainFrequency: grain.frequency,
    convertToGrayscale: isMonochrome ? "True" : "False",
    cameraProfile: profile.profile
  };

  // Replace placeholders in template
  return XMP_TEMPLATE.replace(/\$\{(\w+)\}/g, (_, key) => String(values[key as keyof typeof values]));
};