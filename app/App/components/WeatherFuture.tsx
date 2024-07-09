"use client";
import { useEffect, useState } from "react";
import Loader from "./Loader";
const key = "0e248abb655842a999a160217242306";
import { pos } from "./Main";
import Title from "antd/es/typography/Title";
import { Typography } from "antd";
import { celcy, dataWeatherEx } from "./Main";
import Image from "next/image";
import { SunOutlined } from "@ant-design/icons";

export default function WeaterFuture() {
  const [dataWeatherF, setDataWeatherF] = useState<any>({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (pos !== "") {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${pos}&lang=ru`
        );
        const data = await res.json();
        setDataWeatherF(data);
        setLoading(false);
        console.log(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Title level={3} style={{ fontFamily: "Roboto" }}>
            В течении дня
          </Title>
          <div className="flex flex-col">
            <Title level={4}>
              {dataWeatherF.forecast.forecastday[0].day.condition.text}
            </Title>
            {/* Ощущается как */}
            <div className="flex justify-between items-center">
              <Typography>Ср. температура</Typography>
              <div className="flex items-center gap-2">
                <Typography>
                  {dataWeatherF.forecast.forecastday[0].day.avgtemp_c}
                  {celcy}
                </Typography>
                <Image
                  width={16}
                  height={16}
                  src={"/+temp.svg"}
                  alt="Температура"
                ></Image>
              </div>
            </div>
            {/* Влажность */}
            <div className="flex justify-between items-center">
              <Typography>Влажность</Typography>
              <div className="flex items-center gap-2">
                <Typography>
                  {dataWeatherF.forecast.forecastday[0].day.avghumidity}%
                </Typography>
                <Image
                  width={16}
                  height={16}
                  src={"/humadity.svg"}
                  alt="влажность"
                ></Image>
              </div>
            </div>
            {/* Шанс на осадки */}
            <div className="flex justify-between items-center">
              <Typography>Шанс на осадки</Typography>
              <div className="flex items-center gap-2">
                <Typography>
                  {
                    dataWeatherF.forecast.forecastday[0].day
                      .daily_chance_of_rain
                  }
                  %
                </Typography>
                <Image
                  width={16}
                  height={16}
                  src={"/cloudy.svg"}
                  alt="облачность"
                ></Image>
              </div>
            </div>
            {/*Макс скорость ветра */}
            <div className="flex justify-between items-center">
              <Typography>Макс скорость ветра</Typography>
              <div className="flex items-center gap-2">
                <Typography>
                  {dataWeatherF.forecast.forecastday[0].day.maxwind_kph} Км/ч
                </Typography>
                <Image
                  width={16}
                  height={16}
                  src={"/wind.svg"}
                  alt="Скорость ветра"
                ></Image>
              </div>
            </div>
            {/* Индекс ультрафиолета */}
            <div className="flex justify-between items-center">
              <Typography>Индекс ультрафиолета</Typography>
              <div className="flex items-center gap-2">
                <Typography>
                  {dataWeatherF.forecast.forecastday[0].day.uv}
                </Typography>
                <SunOutlined />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
