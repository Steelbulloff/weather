import WeatherDetails from "./WeatherDetails";
import Search from "antd/es/input/Search";
import WeaterFuture from "./WeatherFuture";
export default function WeaterInfo() {
  return (
    <div className=" bg-transparent h-screen backdrop-blur-sm flex flex-col gap-4 p-2">
      <Search
        placeholder="Город"
        style={{ color: "black", borderBottom: "black" }}
        allowClear
        enterButton={true}
      />
      <WeatherDetails />
      <WeaterFuture />
    </div>
  );
}
