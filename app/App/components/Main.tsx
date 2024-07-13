"use client";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loader";
const WeatherKey = "0e248abb655842a999a160217242306";
const ImageKey = "zfDfdH7UTT5337hbywB5W58OnJHGwOTiOtNlsIcWtPd1ZBQ0iA8nbDe6";
import WeaterInfo from "./WeatherInfo";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import Seasons, { correctSeason } from "./Seasons";
import { createClient } from "pexels";
import { Flex } from "antd";

const client = createClient(
  "zfDfdH7UTT5337hbywB5W58OnJHGwOTiOtNlsIcWtPd1ZBQ0iA8nbDe6"
);

let query = "";

export let pos = "";
export let dataWeatherEx: any = "";
export let celcy: string = "°";
export let bgcode = "";
export let isDay = 1;
export let bgcodeBase = [];
export let bgcodeCurrent = "";

export default function Main() {
  const [dataWeather, setDataWeather] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());
  const [currentBg, setCurrentBg] = useState<any>({});

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
      await navigator.geolocation.getCurrentPosition(
        async function (position) {
          // console.log(position.coords.latitude, position.coords.longitude);
          let ArrPos = [
            `${position.coords.latitude}`,
            `${position.coords.longitude}`,
          ];
          pos = `${ArrPos[0]},${ArrPos[1]}`; // выводит координаты местоположения пользователя
          // console.log(`${ArrPos[0]},${ArrPos[1]}`);

          if (pos !== "") {
            const res = await fetch(
              `https://api.weatherapi.com/v1/current.json?key=${WeatherKey}&q=${pos}&lang=ru`
            );
            const data = await res.json();
            setDataWeather(data);
            setLoading(false);
            console.log(data);
            bgcode = data.current.condition.code;
            isDay = data.current.condition.is_day;
          }
          if (bgcode) {
            setLoading(true);
            const res = await fetch(
              "https://www.weatherapi.com/docs/weather_conditions.json"
            );
            const data = await res.json();
            bgcodeBase = data;
            console.log(bgcodeBase);
            await bgcodeBase.forEach((element: any) => {
              if (element.code == bgcode) {
                if (isDay) {
                  bgcodeCurrent = element.day;
                  console.log(element.day);
                  query = bgcodeCurrent;
                } else {
                  bgcodeCurrent = element.night;
                  query = bgcodeCurrent;
                  console.log(element.night);
                }
                client.photos.search({ query, per_page: 1 }).then((photos) => {
                  setCurrentBg(photos);
                  setLoading(false);
                  console.log(photos);
                });
              }
            });
          }
        },
        function (error) {
          console.log(error.message); // выводит сообщение об ошибке
        }
      );
    };
    fetchData();
  }, []);
  dataWeatherEx = dataWeather;

  const [showDop, setShowDop] = useState(false);

  return (
    <div id={correctSeason} className="overflow-auto bg-slate-500  ">
      {loading ? (
        <Loader />
      ) : (
        <Flex
          vertical
          style={{
            backgroundImage: `url(${currentBg.photos[0].src.original})`,
            backgroundAttachment: "fixed",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex max-sm:flex-col    ">
            <div className="flex w-full gap-2 items-center justify-center max-sm:flex-col h-screen ">
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
            <div className="flex items-start ">
              <div id="show-hidden-buttons" className="hidden max-sm:hidden">
                <div
                  id="show-button"
                  className={`${showDop ? "hidden" : ""}`}
                  onClick={() => {
                    setShowDop(true);
                  }}
                >
                  <LeftCircleOutlined style={{ fontSize: "64px" }} />
                </div>
                <div
                  id="hidden-button"
                  className={`${!showDop ? "hidden" : ""}`}
                  onClick={() => {
                    setShowDop(false);
                  }}
                >
                  <RightCircleOutlined style={{ fontSize: "64px" }} />
                </div>
              </div>
              <div
                id="dop-info"
                className="w-96 bg-transparent h-screen backdrop-blur-sm max-sm:w-full max-sm:block " // {`${!showDop ? "hidden" : ""}}
              >
                <WeaterInfo />
              </div>
            </div>
          </div>
        </Flex>
      )}
      <Seasons />
    </div>
  );
}
