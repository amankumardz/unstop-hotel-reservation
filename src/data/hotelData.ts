import type { Room } from '../types/hotel';

export const generateHotelRooms = (): Room[] => {
  const rooms: Room[] = [];

  for (let floor = 1; floor <= 10; floor += 1) {
    const roomCount = floor === 10 ? 7 : 10;
    for (let position = 1; position <= roomCount; position += 1) {
      rooms.push({
        floor,
        position,
        roomNumber: floor * 100 + position,
        occupied: false
      });
    }
  }

  return rooms;
};
