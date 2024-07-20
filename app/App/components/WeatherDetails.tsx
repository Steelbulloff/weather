import { Typography } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { SunOutlined } from "@ant-design/icons";
import { CELCY } from "@/app/core/provider/consts";

export default function WeatherDetails({ data }: any) {
  data = data.current;
  return (
    <>
      <Title level={3} style={{ fontFamily: "Roboto" }}>
        Сейчас
      </Title>

      <div className="flex flex-col">
        <Title level={4}>{data.condition.text}</Title>

        <div className="flex justify-between items-center">
          <Typography>Ощущается как</Typography>

          <div className="flex items-center gap-2">
            <Typography>
              {data.feelslike_c}
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
            <Typography>{data.humidity}%</Typography>

            <Image
              width={16}
              height={16}
              src={"/humadity.svg"}
              alt="влажность"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Typography>Облачность</Typography>

          <div className="flex items-center gap-2">
            <Typography>{data.cloud}%</Typography>

            <Image
              width={16}
              height={16}
              src={"/cloudy.svg"}
              alt="облачность"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Typography>Скорость ветра</Typography>

          <div className="flex items-center gap-2">
            <Typography>{data.wind_kph} Км/ч</Typography>

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
            <Typography>{data.uv}</Typography>

            <SunOutlined />
          </div>
        </div>
      </div>
    </>
  );
}
