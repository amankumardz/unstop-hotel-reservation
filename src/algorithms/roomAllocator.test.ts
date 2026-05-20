import { describe, expect, it } from 'vitest';
import { generateHotelRooms } from '../data/hotelData';
import { findOptimalRooms } from './roomAllocator';

describe('room allocator', () => {
  it('allocates contiguous rooms on same floor first', () => {
    const rooms = generateHotelRooms();
    const result = findOptimalRooms(rooms, 3);
    expect(result?.roomNumbers).toEqual([101, 102, 103]);
  });

  it('falls back to minimal travel allocation', () => {
    const rooms = generateHotelRooms().map((room) => ({ ...room, occupied: room.floor === 1 }));
    const result = findOptimalRooms(rooms, 2);
    expect(result?.roomNumbers).toEqual([201, 202]);
  });

  it('returns null when not enough rooms', () => {
    const rooms = generateHotelRooms().map((room) => ({ ...room, occupied: true }));
    expect(findOptimalRooms(rooms, 1)).toBeNull();
  });
});
