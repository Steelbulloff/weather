import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

export default function Localtime() {
  const [time, setTime] = useState(new Date());
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Title>{timeString}</Title>

      <Title>{time.toDateString()}</Title>
    </>
  );
}
