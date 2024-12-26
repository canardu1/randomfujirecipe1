export interface WhiteBalanceEffect {
  tempEffect: {
    red: string;
    blue: string;
  };
  tintEffect: {
    magenta: string;
    green: string;
  };
}

export interface ColorOverlay {
  color: string;
  opacity: number;
}