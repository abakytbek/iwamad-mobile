export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'English Club',
    date: '2026-11-05',
    place: 'Room 302',
    seats: 20,
  },
  {
    id: 2,
    title: 'Book Club',
    date: '2026-11-07',
    place: 'Library',
    seats: 15,
  },
  {
    id: 3,
    title: 'Movie Night',
    date: '2026-11-10',
    place: 'Main Hall',
    seats: 3,
  },
  {
    id: 4,
    title: 'Game Night',
    date: '2026-11-12',
    place: 'Room 205',
    seats: 25,
  },
];