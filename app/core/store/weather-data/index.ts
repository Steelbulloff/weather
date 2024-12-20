import { create } from "zustand";
import { useWeatherDataState } from "./models";
import { Position } from "../../models/position";
import { weatherDataApiServices } from "../../services/weather-data";
import { getBgBody } from "../../provider/consts";

export const useWeatherDataStore = create<useWeatherDataState>((set) => ({
  currentWeatherData: null,
  currentWeatherBg: null,
  getCurrentWeatherData: (currentPosition: Position) => {
    weatherDataApiServices.getWeatherData(currentPosition).then((data) => {
      set((state: useWeatherDataState) => ({
        ...state,
        currentWeatherData: data,
      }));
      getBgBody(data).then((currentCondition) => {
        set((state: useWeatherDataState) => ({
          ...state,
          currentWeatherBg: currentCondition,
        }));
      });
    });
  },
}));
