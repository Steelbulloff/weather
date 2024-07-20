import { Typography } from "antd";
import { celcy, dataWeatherEx } from "./Main";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { SunOutlined } from "@ant-design/icons";

export default function WeatherDetails() {
  return (
    <>
      <Title level={3} style={{ fontFamily: "Roboto" }}>
        Сейчас
      </Title>
      <div className="flex flex-col">
        <Title level={4}>{dataWeatherEx.current.condition.text}</Title>

        <div className="flex justify-between items-center">
          <Typography>Ощущается как</Typography>
          <div className="flex items-center gap-2">
            <Typography>
              {dataWeatherEx.current.feelslike_c}
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

        <div className="flex justify-between items-center">
          <Typography>Влажность</Typography>
          <div className="flex items-center gap-2">
            <Typography>{dataWeatherEx.current.humidity}%</Typography>
            <Image
              width={16}
              height={16}
              src={"/humadity.svg"}
              alt="влажность"
            ></Image>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Typography>Облачность</Typography>
          <div className="flex items-center gap-2">
            <Typography>{dataWeatherEx.current.cloud}%</Typography>
            <Image
              width={16}
              height={16}
              src={"/cloudy.svg"}
              alt="облачность"
            ></Image>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Typography>Скорость ветра</Typography>
          <div className="flex items-center gap-2">
            <Typography>{dataWeatherEx.current.wind_kph} Км/ч</Typography>
            <Image
              width={16}
              height={16}
              src={"/wind.svg"}
              alt="Скорость ветра"
            ></Image>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Typography>Индекс ультрафиолета</Typography>
          <div className="flex items-center gap-2">
            <Typography>{dataWeatherEx.current.uv}</Typography>
            <SunOutlined />
          </div>
        </div>
      </div>
    </>
  );
}
