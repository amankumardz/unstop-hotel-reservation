import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useHotelStore } from '../store/useHotelStore';

export const BookingPanel = () => {
  const [requested, setRequested] = useState(1);
  const { rooms, newlyBooked, lastTravelTime, bookRooms, reset, randomOccupancy, toggleDarkMode, darkMode } = useHotelStore();

  const stats = useMemo(() => {
    const occupied = rooms.filter((room) => room.occupied).length;
    const total = rooms.length;
    return { occupied, available: total - occupied, percentage: ((occupied / total) * 100).toFixed(1) };
  }, [rooms]);

  const onBook = () => {
    const response = bookRooms(requested);
    response.success ? toast.success(response.message) : toast.error(response.message);
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-700 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SmartStay Reservation Engine</h1>
        <button onClick={toggleDarkMode} className="rounded bg-slate-700 px-3 py-1 text-xs">{darkMode ? 'Light' : 'Dark'}</button>
      </div>

      <div className="space-y-2">
        <label className="text-sm">Rooms to book (1-5)</label>
        <input type="number" min={1} max={5} value={requested} onChange={(e) => setRequested(Number(e.target.value))} className="w-full rounded bg-slate-800 p-2" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button onClick={onBook} className="rounded bg-blue-600 p-2 font-semibold">Book Rooms</button>
        <button onClick={randomOccupancy} className="rounded bg-amber-600 p-2 font-semibold">Random Occupancy</button>
        <button onClick={reset} className="rounded bg-slate-600 p-2 font-semibold">Reset</button>
      </div>

      <div className="rounded-lg bg-slate-800/70 p-3 text-sm">
        <p>Selected Rooms: {newlyBooked.length ? newlyBooked.join(', ') : 'None'}</p>
        <p>Total Travel Time: {lastTravelTime} mins</p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="rounded bg-emerald-500/20 p-2">Available: {stats.available}</div>
        <div className="rounded bg-rose-500/20 p-2">Occupied: {stats.occupied}</div>
        <div className="rounded bg-blue-500/20 p-2">Occupancy: {stats.percentage}%</div>
      </div>

      <div className="flex gap-3 text-xs">
        <div><span className="mr-1 inline-block h-3 w-3 rounded bg-emerald-500" />Available</div>
        <div><span className="mr-1 inline-block h-3 w-3 rounded bg-rose-500" />Occupied</div>
        <div><span className="mr-1 inline-block h-3 w-3 rounded bg-blue-500" />Newly booked</div>
      </div>
    </div>
  );
};
