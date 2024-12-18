import { activeError } from "@/app/App/components/Main";
import { usePositionStore } from "../store/position";
import { Position } from "../models/position";

export const deleteLocal = () => {
  localStorage.removeItem("NewCity");
  usePositionStore.getState().getCurrentPosition();
};

export const searching = (value: string) => {
  window.localStorage.setItem("NewCity", `${value}`);
  const newPosition: Position = {
    value: window.localStorage.getItem("NewCity") || "",
  };
  usePositionStore.getState().setNewPosition(newPosition);
};

export const callErrors = () => {
  alert(`${activeError}`);
};
