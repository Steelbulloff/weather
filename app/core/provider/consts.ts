export const CELCY: string = "°";
export let bgcode = "";
export const Errors = {
  errorCity: "Не правильное название города",
};

export const IsNewCity =  window.localStorage.getItem("NewCity")
export const RemNewCity = window.localStorage.removeItem("NewCity")

export let ActiveError: any = [];