import { Input } from "antd";
import { dataWeatherEx } from "./Main";
export default function WeaterInfo() {
  return (
    <div className=" bg-transparent h-screen backdrop-blur-sm flex flex-col gap-2 p-2">
      <Input placeholder="Type somthink" style={{ color: "black" }} />
    </div>
  );
}
