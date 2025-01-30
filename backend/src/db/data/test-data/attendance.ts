const attendance: Array<{
  event_id: number;
  user_id: number;
  status: "Registered" | "Attended" | "Cancelled";
  registered_at: string;
}> = [
    {
      event_id: 1,
      user_id: 1,
      status: "Registered",
      registered_at: "2025-01-10 09:00:00"
    },
    {
      event_id: 1,
      user_id: 2,
      status: "Attended",
      registered_at: "2025-01-10 10:00:00"
    },
    {
      event_id: 2,
      user_id: 3,
      status: "Registered",
      registered_at: "2025-01-15 11:00:00"
    },
    {
      event_id: 2,
      user_id: 4,
      status: "Attended",
      registered_at: "2025-01-15 11:30:00"
    },
    {
      event_id: 3,
      user_id: 5,
      status: "Registered",
      registered_at: "2025-01-20 12:00:00"
    },
    {
      event_id: 3,
      user_id: 6,
      status: "Cancelled",
      registered_at: "2025-01-21 13:00:00"
    },
    {
      event_id: 4,
      user_id: 7,
      status: "Registered",
      registered_at: "2025-01-22 14:00:00"
    },
    {
      event_id: 4,
      user_id: 8,
      status: "Attended",
      registered_at: "2025-01-22 15:00:00"
    },
    {
      event_id: 5,
      user_id: 9,
      status: "Cancelled",
      registered_at: "2025-01-25 16:00:00"
    },
    {
      event_id: 5,
      user_id: 10,
      status: "Registered",
      registered_at: "2025-01-26 17:00:00"
    },
    {
      event_id: 6,
      user_id: 1,
      status: "Registered",
      registered_at: "2025-01-30 18:00:00"
    },
    {
      event_id: 6,
      user_id: 3,
      status: "Cancelled",
      registered_at: "2025-01-31 19:00:00"
    },
    {
      event_id: 7,
      user_id: 5,
      status: "Registered",
      registered_at: "2025-02-01 20:00:00"
    },
    {
      event_id: 7,
      user_id: 6,
      status: "Attended",
      registered_at: "2025-02-02 21:00:00"
    },
    {
      event_id: 7,
      user_id: 8,
      status: "Registered",
      registered_at: "2025-02-02 22:00:00"
    }
  ];

  export default attendance;