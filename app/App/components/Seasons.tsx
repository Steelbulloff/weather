import { useEffect, useState } from "react";

export const periodArray: any = [
  "snow",
  "spring",
  "summer",
  "autumn",
  "rain",
  "cloud",
  "clear",
  "tunder",
  "smoke",
  "night",
  "day",
];
export let correctSeason: any = "";
export const date = new Date();
export const mounth = date.getMonth();

export default function Seasons(): any {
  const [Period, setPeriod] = useState<Number>(0);
  correctSeason = periodArray[Period.toString()];
  useEffect(() => {
    console.log(mounth);
    if (mounth <= 1 || mounth == 11) {
      console.log("Зима");
      setPeriod(0);
    } else if (mounth > 1 && mounth <= 4) {
      console.log("Весна");
      setPeriod(1);
    } else if (mounth > 4 && mounth <= 7) {
      console.log("Лето");
      setPeriod(2);
    } else if (mounth > 7 && mounth <= 10) {
      console.log("Осень");
      setPeriod(3);
    }
  }, []);

  return;
}
