import { SyncOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { ActiveError, Errors } from "./Main";

export default function Loader() {
  return (
    <div
      id="loader"
      className=" w-screen h-screen flex items-center justify-center"
    >
      <SyncOutlined spin={true} style={{ fontSize: "128px" }} rotate={90} />
      <Title>{ActiveError}</Title>
    </div>
  );
}
