export type ClubSession = {
  id: string
  date: string
  title: string
  time: string
  bookingUrl?: string
  note?: string
  cancelled?: boolean
}

export type Schedule = {
  sessions: ClubSession[]
  updatedAt: string | null
}

export const defaultSchedule: Schedule = {
  updatedAt: null,
  sessions: [
    { id: '2026-01-10', date: '2026-01-10', title: 'January Code Club', time: '10:00–13:00' },
    { id: '2026-02-14', date: '2026-02-14', title: 'February Code Club', time: '10:00–13:00' },
    { id: '2026-03-14', date: '2026-03-14', title: 'March Code Club', time: '10:00–13:00' },
    { id: '2026-04-11', date: '2026-04-11', title: 'April Code Club', time: '10:00–13:00' },
    { id: '2026-05-09', date: '2026-05-09', title: 'May Code Club', time: '10:00–13:00' },
    { id: '2026-06-13', date: '2026-06-13', title: 'June Code Club', time: '10:00–13:00' },
    { id: '2026-09-12', date: '2026-09-12', title: 'September Code Club', time: '10:00–13:00' },
    { id: '2026-10-10', date: '2026-10-10', title: 'October Code Club', time: '10:00–13:00' },
    { id: '2026-11-14', date: '2026-11-14', title: 'November Code Club', time: '10:00–13:00' },
    { id: '2026-12-12', date: '2026-12-12', title: 'December Code Club', time: '10:00–13:00' },
  ],
}
