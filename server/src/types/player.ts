export interface Player {
  id: number;
  name: string;
  points: number;
  message?: string;
  currentRoundResult?: {
    betAmount: number;
    betMultiplier: number;
    won: boolean;
    result: number;
  };
}