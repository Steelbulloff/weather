import { ActiveError } from "./consts";

export const DeleteLocal = () => {
    localStorage.removeItem("NewCity");
    window.location.reload();
};

export const Searching = (value: any) => {
    window.localStorage.setItem("NewCity", `${value}`);
    window.location.reload();
};

export const callErrors = () => {
    alert(`${ActiveError}`);
};