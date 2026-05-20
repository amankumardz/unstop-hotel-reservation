import type { Room } from '../types/hotel';

const LIFT_POSITION = 1;

export const calculateTravelTime = (roomA: Room, roomB: Room): number => {
  const verticalDistance = Math.abs(roomA.floor - roomB.floor) * 2;
  const horizontalDistance = Math.abs(roomA.position - roomB.position);
  return verticalDistance + horizontalDistance;
};

export const distanceFromLift = (room: Room): number => Math.abs(room.position - LIFT_POSITION);

export const getSpanDistance = (rooms: Room[]): number => {
  const positions = rooms.map((room) => room.floor * 100 + room.position);
  return Math.max(...positions) - Math.min(...positions);
};
