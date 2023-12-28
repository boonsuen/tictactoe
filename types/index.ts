export type Mode = 'HUMAN' | 'ROBOT';
export type Player = 'X' | 'O';
export type Mark = Player | null;
export type Status = 'inProgress' | 'success';
export interface Scores {
  X: number;
  O: number;
  tie: number;
}
