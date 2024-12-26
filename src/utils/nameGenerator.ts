const adjectives = [
  'Vintage', 'Classic', 'Moody', 'Vibrant', 'Soft', 'Cinematic', 'Dreamy', 
  'Natural', 'Rich', 'Muted', 'Film-like', 'Nostalgic', 'Dramatic', 'Subtle',
  'Warm', 'Cool', 'Crisp', 'Faded', 'Clean', 'Dynamic'
];

const subjects = [
  'Portrait', 'Street', 'Landscape', 'Documentary', 'Travel', 'Urban',
  'Nature', 'Light', 'Tone', 'Color', 'Moment', 'Scene', 'Story',
  'Vision', 'Look', 'Style', 'Mood', 'Essence', 'Character', 'Atmosphere'
];

export const generateRecipeName = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  return `${adjective} ${subject}`;
};