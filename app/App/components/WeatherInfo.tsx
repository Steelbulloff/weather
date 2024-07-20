import WeatherDetails from "./WeatherDetails";
import Search from "antd/es/input/Search";
import WeaterFuture from "./WeatherFuture";
import { Button } from "antd";
import { deleteLocal, searching } from "@/app/core/provider/functions";
import { isNewCity } from "@/app/core/provider/consts";

export default function WeaterInfo({ data, position, setCity }: any) {
  return (
    <div className=" bg-transparent h-screen backdrop-blur-sm flex flex-col gap-4 p-2 overflow-auto ">
      <Search
        placeholder="Город"
        style={{ color: "black", borderBottom: "black" }}
        allowClear
        enterButton={true}
        onSearch={(value) => searching(value)}
      />

      <div className={!isNewCity ? "hidden" : ""}>
        <div className="flex items-center justify-center ">
          <div>Погода в городе {position}</div>

          <Button onClick={() => deleteLocal()}>Сбросить поиск</Button>
        </div>
      </div>

      <WeatherDetails data={data} />
      <WeaterFuture position={position} />
    </div>
  );
}
