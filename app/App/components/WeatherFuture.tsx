"use client";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Title from "antd/es/typography/Title";
import { Typography } from "antd";
import Image from "next/image";
import { SunOutlined } from "@ant-design/icons";
import { CELCY } from "@/app/core/provider/consts";
import { WEATHER_KEY } from "@/app/core/provider/API";

interface WeaterFutureProps {
  position: string;
}

export default function WeaterFuture({ position }: WeaterFutureProps) {
  const [dataWeatherF, setDataWeatherF] = useState<any>({});
  const [dataWeatherFArray, setDataWeatherFArray] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (position) {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_KEY}&q=${position}&lang=ru`
        );
        const data = await res.json();
        setDataWeatherF(data.forecast.forecastday[0].day);
        setDataWeatherFArray(data.forecast.forecastday[0].hour);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Title level={3} style={{ fontFamily: "Roboto" }}>
            В течении дня
          </Title>

          <div className="flex flex-col">
            <Title level={4}>{dataWeatherF.condition.text}</Title>

            <div className="flex justify-between items-center">
              <Typography>Ср. температура</Typography>

              <div className="flex items-center gap-2">
                <Typography>
                  {dataWeatherF.avgtemp_c}
                  {CELCY}
                </Typography>

                <Image
                  width={16}
                  height={16}
                  src={"/+temp.svg"}
                  alt="Температура"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Typography>Влажность</Typography>

              <div className="flex items-center gap-2">
                <Typography>{dataWeatherF.avghumidity}%</Typography>

                <Image
                  width={16}
                  height={16}
                  src={"/humadity.svg"}
                  alt="влажность"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Typography>Шанс на осадки</Typography>

              <div className="flex items-center gap-2">
                <Typography>{dataWeatherF.daily_chance_of_rain}%</Typography>

                <Image
                  width={16}
                  height={16}
                  src={"/cloudy.svg"}
                  alt="облачность"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Typography>Макс скорость ветра</Typography>

              <div className="flex items-center gap-2">
                <Typography>{dataWeatherF.maxwind_kph} Км/ч</Typography>

                <Image
                  width={16}
                  height={16}
                  src={"/wind.svg"}
                  alt="Скорость ветра"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Typography>Индекс ультрафиолета</Typography>

              <div className="flex items-center gap-2">
                <Typography>{dataWeatherF.uv}</Typography>

                <SunOutlined />
              </div>
            </div>
          </div>

          <Title level={3}>По часам</Title>

          <div className="flex flex-col gap-6">
            {dataWeatherFArray.map((e: any) => (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <Image
                    src={e.condition.icon}
                    width={32}
                    height={32}
                    alt="fdsdsf"
                  />

                  <div className="flex flex-col w-48 items-center">
                    <Typography>{e.time}</Typography>

                    {e.condition.text}
                  </div>
                </div>

                <div className="flex gap-2 w-16 justify-center items-center">
                  <Typography
                    style={{
                      width: "36px",
                      height: "auto",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {e.temp_c}
                  </Typography>

                  <Image
                    width={16}
                    height={16}
                    src={"/+temp.svg"}
                    alt="Температура"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
