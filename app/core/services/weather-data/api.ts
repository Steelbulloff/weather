import { Position } from "../../models/position";
import { AllForecastWeatherDataType } from "../../models/weather-data";
import { WEATHER_KEY } from "../../provider/API";

class WeatherDataApiServices {
  async getWeatherData(
    currentPosition: Position | null
  ): Promise<AllForecastWeatherDataType> {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_KEY}&q=${currentPosition?.value}&lang=ru`
      );

      // Проверяем, успешен ли ответ
      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      }

      const data: AllForecastWeatherDataType = await res.json();
      return data; // Возвращаем данные
    } catch (error) {
      console.error("Ошибка при получении данных погоды:", error);
      throw error; // Обработка ошибки
    }
  }
}

export const weatherDataApiServices = new WeatherDataApiServices();
