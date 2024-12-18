import WeatherDetails from "./WeatherDetails";
import Search from "antd/es/input/Search";
import WeaterFuture from "./WeatherFuture";
import { Button } from "antd";
import { deleteLocal, searching } from "@/app/core/provider/functions";
import { AllForecastWeatherDataType } from "@/app/core/models/weather-data";
import { usePositionStore } from "@/app/core/store/position";
import { useState } from "react";

export default function WeaterInfo({
  current,
  forecast,
  location,
}: AllForecastWeatherDataType) {
  const { getCurrentPosition, newPosition } = usePositionStore();
  const [postVal, setPostVal] = useState("");

  return (
    <div className=" bg-transparent h-screen backdrop-blur-sm flex flex-col gap-4 p-2 overflow-auto scrollbar scrollbar-none">
      <Search
        placeholder="Город"
        style={{ color: "black", borderBottom: "black" }}
        allowClear
        enterButton={true}
        value={postVal}
        onChange={(val) => setPostVal(val.target.value)}
        onSearch={(value) => {
          if (!value) return;
          searching(value);
          setPostVal("");
        }}
      />

      <div className={newPosition == null ? "hidden" : ""}>
        <div className="flex items-center justify-center ">
          <div>Погода в городе {location?.name}</div>

          <Button onClick={() => deleteLocal()}>Сбросить поиск</Button>
        </div>
      </div>

      {current !== undefined ? <WeatherDetails {...current} /> : null}
      {forecast !== undefined ? (
        <WeaterFuture forecastday={forecast?.forecastday} />
      ) : null}
    </div>
  );
}
