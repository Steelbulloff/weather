"use client";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import WeaterInfo from "./WeatherInfo";
import { Flex } from "antd";
import Localtime from "./Localtime";
import { usePositionStore } from "@/app/core/store/position";
import { useWeatherDataStore } from "@/app/core/store/weather-data";
import { CLIENT } from "@/app/core/provider/API";

export let activeError: any = [];

export default function Main() {
  const { getCurrentPosition, isLoading, setIsLoading } = usePositionStore();
  const { currentWeatherData, currentWeatherBg } = useWeatherDataStore();
  const [currentBg, setCurrentBg] = useState<any>("");

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (currentWeatherBg !== null) {
      let query = currentWeatherBg;
      CLIENT.photos.search({ query, per_page: 1 }).then((photos) => {
        setCurrentBg(photos);
        setIsLoading(false);
      });
    }
  }, [currentWeatherBg]);
  return (
    <div className="overflow-auto bg-slate-500  ">
      {isLoading ? (
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
            <div className="flex w-full gap-2 items-center justify-center max-sm:flex-col h-screen bg-black/[.4] ">
              <div id="temperature" className="">
                <Title style={{ fontSize: "70px" }}>
                  {currentWeatherData?.current?.temp_c}°
                </Title>
              </div>

              <div id="location" className=" flex flex-col items-center">
                <Title>{currentWeatherData?.location?.name}</Title>
                <Title level={4}>
                  ({currentWeatherData?.location?.country})
                </Title>
                <Localtime />
              </div>

              <Image
                src={`${currentWeatherData?.current?.condition.icon}`}
                height={50}
                width={50}
                alt="Состояние погоды"
                priority={false}
              />
            </div>

            <div className="flex items-start ">
              <div
                id="dop-info"
                className="w-96 bg-gray-500 bg-opacity-40 h-screen backdrop-blur-sm max-sm:w-full max-sm:block " // {`${!showDop ? "hidden" : ""}}
              >
                <WeaterInfo {...currentWeatherData} />
              </div>
            </div>
          </div>
        </Flex>
      )}
    </div>
  );
}
