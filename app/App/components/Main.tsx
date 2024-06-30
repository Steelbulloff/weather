"use client";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Typography from "antd/es/typography/Typography";
const key = "0e248abb655842a999a160217242306";
import { InfoCircleOutlined } from "@ant-design/icons";

const period = [
  "snow",
  "rain",
  "cloud",
  "clear",
  "tunder",
  "smoke",
  "night",
  "day",
];

export default function Main() {
  const [dataWeather, setDataWeather] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;

  useEffect(() => {
    const fetchData = async () => {
      let pos = "";
      await navigator.geolocation.getCurrentPosition(
        async function (position) {
          console.log(position.coords.latitude, position.coords.longitude);
          let ArrPos = [
            `${position.coords.latitude}`,
            `${position.coords.longitude}`,
          ];
          pos = `${ArrPos[0]},${ArrPos[1]}`; // выводит координаты местоположения пользователя
          console.log(`${ArrPos[0]},${ArrPos[1]}`);

          if (pos !== "") {
            const res = await fetch(
              `https://api.weatherapi.com/v1/current.json?key=${key}&q=${pos}&lang=ru`
            );
            const data = await res.json();
            setDataWeather(data);
            setLoading(false);
            console.log(
              `https://api.weatherapi.com/v1/current.json?key=${key}&q=${pos}&lang=ru`
            );
          }
        },
        function (error) {
          console.log(error.message); // выводит сообщение об ошибке
        }
      );
    };
    fetchData();
  }, []);
  console.log(dataWeather);
  return (
    <div id={period[0]}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex w-full gap-2 items-center justify-center bottom-1/4 fixed">
            <div id="temperature" className="">
              <Title style={{ fontSize: "70px" }}>
                {dataWeather.current.temp_c}°
              </Title>
            </div>
            <div id="location" className=" flex flex-col items-center">
              <Title>{dataWeather.location.name}</Title>
              <Title>{timeString}</Title>
              <Title>{time.toDateString()}</Title>
            </div>
            <Image
              src={`${dataWeather.current.condition.icon}`}
              height={50}
              width={50}
              alt="Состояние погоды"
              priority={false}
            />
          </div>
          <div className="flex justify-end">
            <InfoCircleOutlined style={{ fontSize: "64px" }} />
          </div>
        </div>
      )}
    </div>
  );
}
