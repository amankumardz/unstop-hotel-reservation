import { motion } from 'framer-motion';
import { useHotelStore } from '../store/useHotelStore';

const roomColor = (occupied: boolean, newlyBooked: boolean) => {
  if (newlyBooked) return 'bg-blue-500';
  if (occupied) return 'bg-rose-500';
  return 'bg-emerald-500';
};

export const RoomGrid = () => {
  const { rooms, newlyBooked } = useHotelStore();

  return (
    <div className="rounded-xl border border-slate-700 p-4">
      <h2 className="mb-3 text-lg font-semibold">Hotel Layout</h2>
      <div className="space-y-2">
        {[...Array(10)].map((_, idx) => {
          const floor = 10 - idx;
          const floorRooms = rooms.filter((room) => room.floor === floor);

          return (
            <div key={floor} className="flex items-center gap-3">
              <div className="w-16 text-xs font-semibold text-slate-400">Floor {floor}</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet-700 text-xs">Lift</div>
              <div className="grid flex-1 grid-cols-10 gap-2">
                {floorRooms.map((room) => (
                  <motion.div
                    layout
                    key={room.roomNumber}
                    initial={{ scale: 0.9, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`rounded-md px-2 py-2 text-center text-xs font-medium text-white ${roomColor(
                      room.occupied,
                      newlyBooked.includes(room.roomNumber)
                    )}`}
                  >
                    {room.roomNumber}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
