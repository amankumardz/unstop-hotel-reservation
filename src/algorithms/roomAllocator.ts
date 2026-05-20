import type { BookingResult, Room } from '../types/hotel';
import { calculateTravelTime, distanceFromLift, getSpanDistance } from '../utils/travelTime';

const pairwiseCost = (rooms: Room[]): number => {
  let cost = 0;
  for (let i = 0; i < rooms.length; i += 1) {
    for (let j = i + 1; j < rooms.length; j += 1) {
      cost += calculateTravelTime(rooms[i], rooms[j]);
    }
  }
  return cost;
};

export const findSameFloorRooms = (availableRooms: Room[], requestedRooms: number): Room[] | null => {
  const grouped = availableRooms.reduce<Map<number, Room[]>>((acc, room) => {
    const floorRooms = acc.get(room.floor) ?? [];
    floorRooms.push(room);
    acc.set(room.floor, floorRooms);
    return acc;
  }, new Map());

  for (const [floor, floorRooms] of [...grouped.entries()].sort((a, b) => a[0] - b[0])) {
    const sorted = floorRooms.sort((a, b) => a.position - b.position);
    for (let i = 0; i <= sorted.length - requestedRooms; i += 1) {
      const window = sorted.slice(i, i + requestedRooms);
      const contiguous = window.every((room, idx) => idx === 0 || room.position - window[idx - 1].position === 1);
      if (contiguous) {
        return window;
      }
    }
    void floor;
  }
  return null;
};

const scoreRooms = (rooms: Room[]) => {
  const maxVertical = Math.max(...rooms.map((room) => room.floor)) - Math.min(...rooms.map((room) => room.floor));
  return {
    cost: pairwiseCost(rooms),
    verticalPenalty: maxVertical,
    spanPenalty: getSpanDistance(rooms),
    liftPenalty: rooms.reduce((sum, room) => sum + distanceFromLift(room), 0),
    floorPreference: Math.min(...rooms.map((room) => room.floor))
  };
};

export const findBestCombination = (availableRooms: Room[], requestedRooms: number): Room[] | null => {
  let best: Room[] | null = null;
  let bestScore: ReturnType<typeof scoreRooms> | null = null;

  const walk = (start: number, path: Room[]) => {
    if (path.length === requestedRooms) {
      const score = scoreRooms(path);
      if (
        !bestScore ||
        score.cost < bestScore.cost ||
        (score.cost === bestScore.cost && score.verticalPenalty < bestScore.verticalPenalty) ||
        (score.cost === bestScore.cost && score.verticalPenalty === bestScore.verticalPenalty && score.spanPenalty < bestScore.spanPenalty) ||
        (score.cost === bestScore.cost && score.verticalPenalty === bestScore.verticalPenalty && score.spanPenalty === bestScore.spanPenalty && score.liftPenalty < bestScore.liftPenalty) ||
        (score.cost === bestScore.cost && score.verticalPenalty === bestScore.verticalPenalty && score.spanPenalty === bestScore.spanPenalty && score.liftPenalty === bestScore.liftPenalty && score.floorPreference < bestScore.floorPreference)
      ) {
        best = [...path];
        bestScore = score;
      }
      return;
    }

    for (let i = start; i < availableRooms.length; i += 1) {
      path.push(availableRooms[i]);
      walk(i + 1, path);
      path.pop();
    }
  };

  walk(0, []);
  return best;
};

export const findOptimalRooms = (rooms: Room[], requestedRooms: number): BookingResult | null => {
  const availableRooms = rooms.filter((room) => !room.occupied).sort((a, b) => a.roomNumber - b.roomNumber);
  if (requestedRooms < 1 || requestedRooms > 5 || availableRooms.length < requestedRooms) return null;

  // Step 1: prioritize contiguous same-floor blocks.
  const sameFloor = findSameFloorRooms(availableRooms, requestedRooms);
  const selected = sameFloor ?? findBestCombination(availableRooms, requestedRooms);
  if (!selected) return null;

  return {
    roomNumbers: selected.map((room) => room.roomNumber),
    travelTime: pairwiseCost(selected)
  };
};
