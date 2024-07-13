import WeatherDetails from "./WeatherDetails";
import Search from "antd/es/input/Search";
import WeaterFuture from "./WeatherFuture";
import { useEffect, useState } from "react";

export let WeatherCode = "";

export default function WeaterInfo() {
  const [WeatherCondCode, setWeatherCondCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://www.weatherapi.com/docs/weather_conditions.json"
      );
      const data = await res.json();
      setWeatherCondCode(data);
    };
    fetchData();
    WeatherCode = WeatherCondCode;
  }, []);

  return (
    <div className=" bg-transparent h-screen backdrop-blur-sm flex flex-col gap-4 p-2 overflow-auto ">
      <Search
        placeholder="Город"
        style={{ color: "black", borderBottom: "black" }}
        allowClear
        enterButton={true}
      />
      <WeatherDetails />
      <WeaterFuture />
    </div>
  );
}
