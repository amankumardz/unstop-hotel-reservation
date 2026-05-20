import { create } from 'zustand';
import { generateHotelRooms } from '../data/hotelData';
import { findOptimalRooms } from '../algorithms/roomAllocator';
import type { Room } from '../types/hotel';

interface HotelState {
  rooms: Room[];
  newlyBooked: number[];
  lastTravelTime: number;
  darkMode: boolean;
  bookRooms: (requested: number) => { success: boolean; message: string };
  reset: () => void;
  randomOccupancy: () => void;
  toggleDarkMode: () => void;
}

const seedRooms = () => generateHotelRooms();

export const useHotelStore = create<HotelState>((set, get) => ({
  rooms: seedRooms(),
  newlyBooked: [],
  lastTravelTime: 0,
  darkMode: true,
  bookRooms: (requested) => {
    const result = findOptimalRooms(get().rooms, requested);
    if (!result) return { success: false, message: 'Unable to allocate rooms with current availability.' };

    set((state) => ({
      rooms: state.rooms.map((room) =>
        result.roomNumbers.includes(room.roomNumber) ? { ...room, occupied: true } : room
      ),
      newlyBooked: result.roomNumbers,
      lastTravelTime: result.travelTime
    }));

    return { success: true, message: `Booked rooms: ${result.roomNumbers.join(', ')}` };
  },
  reset: () => set({ rooms: seedRooms(), newlyBooked: [], lastTravelTime: 0 }),
  randomOccupancy: () =>
    set((state) => ({
      rooms: state.rooms.map((room) => ({ ...room, occupied: Math.random() < 0.35 })),
      newlyBooked: [],
      lastTravelTime: 0
    })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
}));
