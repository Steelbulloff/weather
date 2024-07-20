import { AnyTxtRecord } from "dns";

export const CELCY: string = "°";
export let bgcode = "";
export const Errors = {
  errorCity: "Не правильное название города",
};

export let IsNewCity:any

export let RemNewCity :void 

if (typeof window !== 'undefined') {
  // Safely access localStorage
 IsNewCity = localStorage.getItem("NewCity");
 RemNewCity = localStorage.removeItem("NewCity");
}

export let ActiveError = [];