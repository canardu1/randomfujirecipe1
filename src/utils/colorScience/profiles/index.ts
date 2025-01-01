import { fujifilmProfiles } from './fujifilm';
import { kodakProfiles } from './kodak';
import { cinestillProfiles } from './cinestill';
import { ilfordProfiles } from './ilford';
import { kodakBWProfiles } from './kodakBW';
import { cinematicProfiles } from './cinematic';
import { cinematicExtendedProfiles } from './cinematicExtended';
import { instagramInspired } from './instagramInspired';
import { blackAndWhiteProfiles } from './blackAndWhite';

// Combine all profiles with proper precedence
export const filmProfiles = {
  // Fujifilm
  ...fujifilmProfiles,
  ...blackAndWhiteProfiles,
  // Other film stocks
  ...kodakProfiles,
  ...cinestillProfiles,
  ...ilfordProfiles,
  ...kodakBWProfiles,
  // Cinematic looks
  ...cinematicProfiles,
  ...cinematicExtendedProfiles,
  // Modern looks
  ...instagramInspired
} as const;