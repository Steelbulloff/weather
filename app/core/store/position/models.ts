import { Position } from "../../models/position";

export interface PositionState {
  currentPosition: Position | null;
  isLoading: boolean;
  newPosition: Position | null;
  getCurrentPosition: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setNewPosition: (newPosition: Position) => void;
}
