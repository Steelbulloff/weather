import { Input, Typography } from "antd";
import { celcy, dataWeatherEx } from "./Main";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import WeatherDetails from "./WeatherDetails";
import Search from "antd/es/input/Search";
export default function WeaterInfo() {
  return (
    <div className=" bg-transparent h-screen backdrop-blur-sm flex flex-col gap-4 p-2">
      <Search
        placeholder="Город"
        style={{ color: "black", borderBottom: "black" }}
        allowClear
        enterButton={true}
      />
      <WeatherDetails />
    </div>
  );
}
