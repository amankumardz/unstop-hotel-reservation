export type RoomStatus = 'available' | 'occupied' | 'newlyBooked';

export interface Room {
  roomNumber: number;
  floor: number;
  position: number;
  occupied: boolean;
}

export interface BookingResult {
  roomNumbers: number[];
  travelTime: number;
}
