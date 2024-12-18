"use client";
import { Typography } from "antd";
import Image from "next/image";
import { SunOutlined } from "@ant-design/icons";
import { CELCY } from "@/app/core/provider/consts";
import { ForecastWeatherDataType } from "@/app/core/models/weather-data";

export default function WeaterFuture({ forecastday }: ForecastWeatherDataType) {
  return (
    <>
      <>
        <Typography.Title level={3} style={{ fontFamily: "Roboto" }}>
          В течении дня
        </Typography.Title>

        <div className="flex flex-col">
          <Typography.Title level={4}>
            {forecastday[0].day.condition.text}
          </Typography.Title>

          <div className="flex justify-between items-center">
            <Typography>Ср. температура</Typography>

            <div className="flex items-center gap-2">
              <Typography>
                {forecastday[0].day.avgtemp_c}
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
              <Typography>{forecastday[0].day.avghumidity}%</Typography>

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
              <Typography>
                {forecastday[0].day.daily_chance_of_rain}%
              </Typography>

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
              <Typography>{forecastday[0].day.maxwind_kph} Км/ч</Typography>

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
              <Typography>{forecastday[0].day.uv}</Typography>

              <SunOutlined />
            </div>
          </div>
        </div>

        <Typography.Title level={3}>По часам</Typography.Title>

        <div className="flex flex-col gap-6">
          {forecastday[0].hour.map((e: any, key) => (
            <div className="flex items-center justify-between" key={key}>
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
    </>
  );
}
