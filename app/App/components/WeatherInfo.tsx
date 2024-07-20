import WeatherDetails from "./WeatherDetails";
import Search from "antd/es/input/Search";
import WeaterFuture from "./WeatherFuture";
import { Button } from "antd";
import { pos } from "./Main";

export default function WeaterInfo() {
  const DeleteLocal = () => {
    localStorage.removeItem("NewCity");
    // window.location.reload();
  };

  const Searching = (value: any) => {
    window.localStorage.setItem("NewCity", `${value}`);
    // window.location.reload();
  };

  return (
    <div className=" bg-transparent h-screen backdrop-blur-sm flex flex-col gap-4 p-2 overflow-auto ">
      <Search
        placeholder="Город"
        style={{ color: "black", borderBottom: "black" }}
        allowClear
        enterButton={true}
        onSearch={(value) => Searching(value)}
      />
      <div className={!window.localStorage.getItem("NewCity") ? "hidden" : ""}>
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
