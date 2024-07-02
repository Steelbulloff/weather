import { Typography } from "antd";
import { celcy, dataWeatherEx } from "./Main";
import Title from "antd/es/typography/Title";
import Image from "next/image";

export default function WeatherDetails() {
  return (
    <div>
      <Title level={4} style={{ fontFamily: "Roboto" }}>
        Подробная информация о погоде
      </Title>
      <div className="flex flex-col">
        <Title level={4}>{dataWeatherEx.current.condition.text}</Title>
        {/* Ощущается как */}
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
        {/* Влажность */}
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
        {/* Облачность */}
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
        {/* Скорость ветра */}
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
      </div>
    </div>
  );
}
