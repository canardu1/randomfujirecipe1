import { Sun, Cloud, CloudSun, Lightbulb, Zap, Settings } from 'lucide-react';

type WhiteBalanceType = 'Auto' | 'Daylight' | 'Shade' | 'Cloudy' | 'Tungsten' | 'Fluorescent';

interface WhiteBalanceIconProps {
  type: WhiteBalanceType;
  className?: string;
}

export function WhiteBalanceIcon({ type, className = "w-4 h-4" }: WhiteBalanceIconProps) {
  switch (type) {
    case 'Auto':
      return <Settings className={className} />;
    case 'Daylight':
      return <Sun className={className} />;
    case 'Shade':
      return <CloudSun className={className} />;
    case 'Cloudy':
      return <Cloud className={className} />;
    case 'Tungsten':
      return <Lightbulb className={className} />;
    case 'Fluorescent':
      return <Zap className={className} />;
    default:
      return null;
  }
}