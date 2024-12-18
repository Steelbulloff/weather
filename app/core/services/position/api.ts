import { Position } from "../../models/position";

class PositionApiServices {
  async getPosition(): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const ArrPos: Position = {
            value: `${position.coords.latitude},${position.coords.longitude}`,
          };
          resolve(ArrPos);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

export const positionApiServices = new PositionApiServices();
