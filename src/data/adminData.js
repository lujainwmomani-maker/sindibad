export const kpis = [
  {
    label: "Total Users",
    value: "24,850",
    note: "↗ +12.4% vs last mo",
    icon: "👥",
  },
  {
    label: "Verified Guides",
    value: "142",
    note: "+4 new this week",
    icon: "🧭",
    amber: true,
  },
  {
    label: "Upcoming Trips",
    value: "38",
    note: "8 departing soon",
    icon: "🗺️",
  },
  {
    label: "Bookings Month",
    value: "1,280",
    note: "↗ +18.2% peak demand",
    icon: "🎫",
  },
  {
    label: "Revenue Month",
    value: "184,500",
    unit: "JOD",
    note: "↗ +15.6% MoM",
    icon: "💵",
    amber: true,
  },
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
];
export const bookingsSeries = [30, 42, 70, 95, 60, 45, 38, 33, 55, 92, 70];
export const revenueSeries = [25, 35, 60, 82, 58, 42, 33, 30, 52, 70, 60];

export const alerts = [
  {
    id: 1,
    title: "3 Guide Approvals",
    tag: "2h ago",
    text: "Ministry of Tourism permit licenses uploaded for validation.",
  },
  {
    id: 2,
    title: "2 Trips >95% Capacity",
    tag: "Critical",
    crit: true,
    text: "Petra Dawn Walk & Dana Canyon trail nearing hard participant caps.",
  },
  {
    id: 3,
    title: "Guide Unassigned",
    tag: "Action req.",
    text: "Wadi Rum Stargazing Expedition (Dept: Tomorrow 19:30).",
  },
];

export const pendingGuides = [
  {
    id: 1,
    name: "Tariq Al-Majali",
    badge: "#4920",
    info: "Petra & Nabataean History • Licensed EN / FR",
    img: "/images/guide1.jpg",
  },
  {
    id: 2,
    name: "Rania Haddad",
    badge: "#5184",
    info: "Hiking & Wadi Mujib Canyoning • Licensed EN / AR",
    img: "/images/guide2.jpg",
  },
];

export const revenueByDest = [
  {
    name: "Petra Archaeological Park",
    pct: 42,
    jod: "77,490",
    color: "var(--blue)",
  },
  {
    name: "Wadi Rum Protected Area",
    pct: 28,
    jod: "51,660",
    color: "var(--amber)",
  },
  {
    name: "Dead Sea & Ma'in Hot Springs",
    pct: 16,
    jod: "29,520",
    color: "#14b8a6",
  },
  {
    name: "Jerash Roman Ruins & Amman City",
    pct: 14,
    jod: "25,830",
    color: "#64748b",
  },
];

export const bookings = [
  {
    id: "#SIN-9842",
    name: "Emma Henderson",
    who: "UK • 2 Guests",
    tour: "2-Day Wadi Rum & Petra Explorer",
    sub: "Private Jeep & Desert Camp",
    date: "May 18, 2025 08:30 AM",
    amount: "480.00",
    status: "Paid",
  },
  {
    id: "#SIN-9841",
    name: "Markus Koenig",
    who: "DE • 4 Guests",
    tour: "Dead Sea Sunset & Wellness Retreat",
    sub: "Private Resort Access",
    date: "May 19, 2025 02:00 PM",
    amount: "320.00",
    status: "Paid",
  },
  {
    id: "#SIN-9840",
    name: "Sami Al-Otaibi",
    who: "KSA • 6 Guests",
    tour: "Jerash Decapolis & Ajloun Castle Tour",
    sub: "Historical Guided Excursion",
    date: "May 20, 2025 09:00 AM",
    amount: "210.00",
    status: "Pending",
  },
  {
    id: "#SIN-9839",
    name: "Claire Laurent",
    who: "FR • 1 Guest",
    tour: "Wadi Rum Stargazing & Bedouin Bivouac",
    sub: "Overnight Astronomy Camp",
    date: "May 21, 2025 06:00 PM",
    amount: "175.00",
    status: "Paid",
  },
];
