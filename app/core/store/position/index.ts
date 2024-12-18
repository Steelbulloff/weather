import { create } from "zustand";
import { PositionState } from "./models";
import { positionApiServices } from "../../services/position";
import { useWeatherDataStore } from "../weather-data";
import { Position } from "../../models/position";

export const usePositionStore = create<PositionState>((set) => ({
  currentPosition: null,
  isLoading: true,
  newPosition: null,
  setIsLoading: (isLoading: boolean) => {
    set((state: PositionState) => ({
      ...state,
      isLoading: isLoading,
    }));
  },
  getCurrentPosition: () => {
    positionApiServices.getPosition().then((ArrPos) => {
      set((state: PositionState) => ({
        ...state,
        currentPosition: ArrPos,
      }));
      useWeatherDataStore.getState().getCurrentWeatherData(ArrPos);
    });
  },
  setNewPosition: (newPosition: Position) => {
    positionApiServices.getPosition().then((ArrPos) => {
      set((state: PositionState) => ({
        ...state,
        newPosition: newPosition,
      }));
      useWeatherDataStore.getState().getCurrentWeatherData(newPosition);
    });
  },
}));
