export const CELCY: string = "°";
export const errors = {
  errorCity: "Не правильное название города",
};
export let isNewCity:string|null;
export let remNewCity :void 
export let activeError = [];

if (typeof window !== 'undefined') {
  // Safely access localStorage
 isNewCity = localStorage.getItem("NewCity");
 remNewCity = localStorage.removeItem("NewCity");
}

