"use client";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import WeaterInfo from "./WeatherInfo";
import { Flex } from "antd";
import Localtime from "./Localtime";
import { CLIENT, WEATHER_KEY } from "@/app/core/provider/API";
import { errors, isNewCity, remNewCity } from "@/app/core/provider/consts";
import { callErrors } from "@/app/core/provider/functions";

export let activeError: any = [];

export default function Main() {
  const [dataWeather, setDataWeather] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentBg, setCurrentBg] = useState<any>({});
  const [currentPosition, setCurrentPosition] = useState<string>();
  const [weaterBgCode, setWeaterBgCode] = useState<number>();

  let query = "";
  let isDay = 1;

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let ArrPos = [
          `${position.coords.latitude}`,
          `${position.coords.longitude}`,
        ];
        setCurrentPosition(
          (() => {
            if (isNewCity) {
              return isNewCity;
            } else {
              return `${ArrPos[0]},${ArrPos[1]}`;
            }
          })()
        );
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getPosition = async () => {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${currentPosition}&lang=ru`
      );
      const data = await res.json();

      if (!data.error) {
        setDataWeather(data);
        setWeaterBgCode(data.current.condition.code);
        if (isDay !== data.current.is_day) {
          isDay = 0;
        }
      } else {
        console.log("error city");
        activeError = errors.errorCity;
        remNewCity;
        callErrors();
        window.location.reload();
      }
    };
    if (currentPosition) {
      getPosition();
    }
  }, [currentPosition]);

  useEffect(() => {
    const getBgCode = async () => {
      setLoading(true);
      const res = await fetch(
        "https://www.weatherapi.com/docs/weather_conditions.json"
      );
      const data = await res.json();
      const finded_bg_code = data.find(
        (element: any) => element.code == weaterBgCode
      );

      if (finded_bg_code) {
        if (isDay) {
          query = finded_bg_code.day;
        } else {
          query = finded_bg_code.night;
        }
        CLIENT.photos.search({ query, per_page: 1 }).then((photos) => {
          setCurrentBg(photos);
          setLoading(false);
        });
      }
    };
    getBgCode();
  }, [weaterBgCode]);
  return (
    <div className="overflow-auto bg-slate-500  ">
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
          <div className="flex max-sm:flex-col">
            <div className="flex w-full gap-2 items-center justify-center max-sm:flex-col h-screen">
              <div id="temperature" className="">
                <Title style={{ fontSize: "70px" }}>
                  {dataWeather.current.temp_c}°
                </Title>
              </div>

              <div id="location" className=" flex flex-col items-center">
                <Title>{dataWeather.location.name}</Title>
                <Title level={4}>({dataWeather.location.country})</Title>
                <Localtime />
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
              <div
                id="dop-info"
                className="w-96 bg-gray-500 bg-opacity-20 h-screen backdrop-blur-sm max-sm:w-full max-sm:block " // {`${!showDop ? "hidden" : ""}}
              >
                <WeaterInfo data={dataWeather} position={currentPosition} />
              </div>
            </div>
          </div>
        </Flex>
      )}
    </div>
  );
}
