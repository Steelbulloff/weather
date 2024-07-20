import { useEffect, useState } from "react";

export const periodArray: string[] = [
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
  "another",
];
export let correctSeason: any = "";
export const date = new Date();
export const mounth = date.getMonth();

export default function Seasons(): any {
  const [Period, setPeriod] = useState<number>(11);
  correctSeason = periodArray[Period];
  useEffect(() => {
    if (mounth <= 1 || mounth == 11) {
      setPeriod(0);
    } else if (mounth > 1 && mounth <= 4) {
      setPeriod(1);
    } else if (mounth > 4 && mounth <= 7) {
      setPeriod(2);
    } else if (mounth > 7 && mounth <= 10) {
      setPeriod(3);
    }
  }, []);

  return;
}
