# SmartStay Reservation Engine

A production-oriented React + TypeScript + Vite application for optimized hotel room allocation.

## Features
- 97-room hotel model (floors 1-9: 10 rooms each, floor 10: 7 rooms)
- Smart allocator with same-floor contiguous preference, then global minimum travel cost
- Travel cost model: vertical floors × 2 + horizontal distance
- Max 5 rooms per booking
- Room status visualization (available/occupied/new)
- Random occupancy simulation
- Reset flow
- Statistics panel and dark mode
- Framer Motion animations and toast notifications
- Unit tests for allocation logic

## Setup
```bash
npm install
npm run dev
```

## Scripts
```bash
npm run dev
npm run build
npm run preview
npm run test
```

## Deployment (Vercel)
1. Push repository to GitHub.
2. Import project in Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.
