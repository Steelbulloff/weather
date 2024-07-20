import { activeError } from "./consts";

export const deleteLocal = () => {
    localStorage.removeItem("NewCity");
    window.location.reload();
};

export const searching = (value: string) => {
    window.localStorage.setItem("NewCity", `${value}`);
    window.location.reload();
};

export const callErrors = () => {
    alert(`${activeError}`);
};