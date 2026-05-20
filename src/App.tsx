import { Toaster } from 'react-hot-toast';
import { BookingPanel } from './components/BookingPanel';
import { RoomGrid } from './components/RoomGrid';
import { useHotelStore } from './store/useHotelStore';

function App() {
  const darkMode = useHotelStore((s) => s.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-3">
          <div className="lg:col-span-1"><BookingPanel /></div>
          <div className="lg:col-span-2"><RoomGrid /></div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
