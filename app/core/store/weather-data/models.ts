import { Position } from "../../models/position";
import { AllForecastWeatherDataType } from "../../models/weather-data";

export interface useWeatherDataState {
  currentWeatherData: AllForecastWeatherDataType | null;
  currentWeatherBg: string | null;
  getCurrentWeatherData: (currentPosition: Position) => void;
}
