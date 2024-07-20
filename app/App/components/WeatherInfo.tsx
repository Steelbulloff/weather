import WeatherDetails from "./WeatherDetails";
import Search from "antd/es/input/Search";
import WeaterFuture from "./WeatherFuture";
import { Button } from "antd";
import { pos } from "./Main";
import { DeleteLocal, Searching } from "@/app/core/provider/functions";
import { IsNewCity } from "@/app/core/provider/consts";

export default function WeaterInfo() {
  return (
    <div className=" bg-transparent h-screen backdrop-blur-sm flex flex-col gap-4 p-2 overflow-auto ">
      <Search
        placeholder="Город"
        style={{ color: "black", borderBottom: "black" }}
        allowClear
        enterButton={true}
        onSearch={(value) => Searching(value)}
      />

      <div className={!IsNewCity ? "hidden" : ""}>
        <div className="flex items-center justify-center ">
          <div>Погода в городе {pos}</div>

          <Button onClick={() => DeleteLocal()}>Сбросить поиск</Button>
        </div>
      </div>

      <WeatherDetails />
      <WeaterFuture />
    </div>
  );
}
