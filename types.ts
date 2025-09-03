
export enum GameState {
  Start,
  Playing,
  End,
}

export interface Technique {
  id: string;
  name: string;
  description: string;
}

export interface KillChainPhase {
  name: string;
  description: string;
  techniques: Technique[];
}
