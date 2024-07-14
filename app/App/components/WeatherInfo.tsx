import WeatherDetails from "./WeatherDetails";
import Search from "antd/es/input/Search";
import WeaterFuture from "./WeatherFuture";
import { useEffect, useState } from "react";
import { WeatherKey } from "./Main";
import { Button } from "antd";
import { pos } from "./Main";

export let WeatherCode = "";
export let NewPos = "";

export default function WeaterInfo() {
  const [WeatherCondCode, setWeatherCondCode] = useState("");

  const [NewCity, setNewCity] = useState<any>("");

  const DeleteLocal = () => {
    localStorage.removeItem("NewCity");
    window.location.reload();
  };

  const Searching = (value: any) => {
    window.localStorage.setItem("NewCity", `${value}`);
    let kek = window.localStorage.getItem("NewCity");
    setNewCity(kek);
    NewPos = NewCity;
    window.location.reload();

    // const fetchData = async () => {
    //   const res = await fetch(
    //     `https://api.weatherapi.com/v1/current.json?key=${WeatherKey}&q=${value}&lang=ru`
    //   );
    //   console.log(
    //     `https://api.weatherapi.com/v1/current.json?key=${WeatherKey}&q=${value}&lang=ru`
    //   );
    //   const data = await res.json();
    //   console.log(data);
    //   setNewCity(data);
    //   NewPos = NewCity;
    // };
    // fetchData();
  };

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
        // onChange={() => onSearching()}
        onSearch={(value) => Searching(value)}
      />
      <div className={!window.localStorage.getItem("NewCity") ? "hidden" : ""}>
        <div className="flex items-center justify-center ">
          <div>Погода в городе {pos}</div>
          <Button onClick={() => DeleteLocal()}>Сбросить поиск</Button>
        </div>
      </div>
      <WeatherDetails />
      <WeaterFuture />
    </div>
  );
}
