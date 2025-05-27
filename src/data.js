export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const monthNamesAbbr = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// --- Surf Destination Data with Coordinates ---
export const destinationsInfo = [
  {
    name: "North Shore, Oahu, Hawaii", country: "USA",
    latitude: 21.65, longitude: -158.05,
    periods: [{ type: "high", months: [11, 0, 1] }, { type: "shoulder", months: [10, 2] }],
    swellData: { 0: "10-15ft+", 1: "10-15ft+", 2: "6-10ft", 3:"3-5ft", 4:"2-4ft", 5:"1-3ft", 6:"1-3ft", 7:"2-4ft", 8:"3-5ft", 9:"5-8ft", 10: "8-12ft", 11: "10-15ft+" }
  },
  {
    name: "Puerto Escondido, Mexico", country: "Mexico",
    latitude: 15.86, longitude: -97.07,
    periods: [{ type: "high", months: [4, 5, 6, 7] }, { type: "shoulder", months: [3, 8, 9] }],
    swellData: { 0:"3-5ft", 1:"3-5ft", 2:"4-6ft", 3: "5-8ft", 4: "8-12ft+", 5: "8-12ft+", 6: "8-12ft+", 7: "6-10ft", 8: "5-8ft", 9: "4-7ft", 10:"3-6ft", 11:"3-5ft" }
  },
  {
    name: "Taghazout, Morocco", country: "Morocco",
    latitude: 30.54, longitude: -9.71,
    periods: [{ type: "high", months: [10, 11, 0, 1, 2] }, { type: "shoulder", months: [9, 3] }],
    swellData: { 0: "6-10ft", 1: "6-10ft", 2: "5-8ft", 3: "4-6ft", 4:"2-4ft", 5:"1-3ft", 6:"1-3ft", 7:"2-4ft", 8:"3-5ft", 9: "5-8ft", 10: "6-10ft", 11: "6-10ft" }
  },
  {
    name: "Margaret River, Australia", country: "Australia",
    latitude: -33.95, longitude: 115.07,
    periods: [{ type: "high", months: [2, 3, 4, 5] }, { type: "shoulder", months: [1, 6, 7, 8, 9] }],
    swellData: {0:"5-8ft", 1: "6-10ft", 2: "8-12ft", 3: "8-12ft+", 4: "8-12ft+", 5: "6-10ft", 6:"6-10ft", 7:"5-8ft", 8:"5-8ft", 9:"6-10ft", 10:"5-8ft", 11:"5-8ft"}
  },
  {
    name: "Canary Islands, Spain", country: "Spain", 
    latitude: 28.2916, longitude: -16.6291,
    periods: [{ type: "high", months: [9, 10, 11, 0, 1, 2] }, { type: "shoulder", months: [3, 4, 8] }],
    swellData: { 0: "6-10ft", 1: "6-10ft", 2: "5-8ft", 3:"4-6ft", 4:"3-5ft", 5:"2-4ft", 6:"2-4ft", 7:"3-5ft", 8: "4-7ft", 9: "6-10ft", 10: "6-10ft", 11: "6-10ft" }
  },
  {
    name: "Gold Coast, Australia", country: "Australia",
    latitude: -28.0167, longitude: 153.4000,
    periods: [{ type: "high", months: [1, 2, 3, 4] }, { type: "shoulder", months: [0, 5, 11] }],
    swellData: { 0: "3-6ft", 1: "4-8ft", 2: "5-10ft", 3: "5-10ft", 4: "4-8ft", 5: "3-5ft", 6:"2-4ft", 7:"2-4ft", 8:"3-5ft", 9:"3-6ft", 10:"3-6ft", 11: "3-6ft" }
  },
  {
    name: "Mentawai Islands, Indonesia", country: "Indonesia", 
    latitude: -2.15, longitude: 99.66,
    periods: [{ type: "high", months: [3, 4, 5, 6, 7, 8] }, { type: "shoulder", months: [2, 9] }],
    swellData: { 0:"3-5ft", 1:"3-5ft", 2: "4-8ft", 3: "6-10ft", 4: "6-10ft+", 5: "6-10ft+", 6: "6-10ft+", 7: "6-10ft", 8: "5-8ft", 9: "4-8ft", 10:"3-6ft", 11:"3-5ft" }
  },
  {
    name: "Jeffreys Bay, South Africa", country: "South Africa",
    latitude: -34.05, longitude: 24.92,
    periods: [{ type: "high", months: [5, 6, 7] }, { type: "shoulder", months: [3, 4, 8] }],
    swellData: { 0:"3-5ft", 1:"3-6ft", 2:"4-6ft", 3: "5-8ft", 4: "6-10ft", 5: "8-12ft+", 6: "8-12ft+", 7: "6-10ft", 8: "5-8ft", 9:"4-6ft", 10:"3-5ft", 11:"3-5ft" }
  },
  {
    name: "Cloudbreak, Fiji", country: "Fiji",
    latitude: -17.85, longitude: 177.20,
    periods: [{ type: "high", months: [3, 4, 5, 6, 7, 8, 9] }, { type: "shoulder", months: [2, 10] }],
    swellData: { 0:"3-6ft", 1:"4-8ft", 2: "6-10ft", 3: "8-12ft+", 4: "8-15ft+", 5:"8-15ft+", 6:"8-15ft+", 7:"8-12ft+", 8:"6-10ft", 9:"5-8ft", 10: "4-8ft", 11:"3-6ft" }
  },
  {
    name: "Bali, Indonesia", country: "Indonesia", 
    latitude: -8.7192, longitude: 115.1686,
    periods: [{ type: "high", months: [4, 5, 6, 7, 8] }, { type: "shoulder", months: [3, 9] }],
    swellData: { 0:"2-4ft", 1:"2-4ft", 2:"3-5ft", 3: "4-8ft", 4: "5-8ft+", 5: "5-8ft+", 6:"5-8ft+", 7:"4-8ft", 8:"3-6ft", 9: "3-5ft", 10:"2-4ft", 11:"2-4ft" }
  },
  {
    name: "Hossegor, France", country: "France",
    latitude: 43.67, longitude: -1.43,
    periods: [{ type: "high", months: [8, 9] }, { type: "shoulder", months: [5, 6, 7, 10] }],
    swellData: { 0:"3-6ft", 1:"3-6ft", 2:"4-7ft", 3:"4-7ft", 4:"5-8ft", 5:"6-10ft", 6:"5-8ft", 7: "6-10ft", 8: "8-12ft+", 9: "8-12ft+", 10: "6-10ft", 11:"5-8ft" }
  },
  {
    name: "Portugal (General)", country: "Portugal", 
    latitude: 38.7223, longitude: -9.1393,
    periods: [{ type: "high", months: [9, 10, 11, 0, 1, 2] }, { type: "shoulder", months: [3, 4, 8] }],
    swellData: { 0: "6-12ft", 1: "6-12ft", 2:"5-10ft", 3:"4-8ft", 4:"3-6ft", 5:"2-5ft", 6:"2-4ft", 7:"3-5ft", 8: "4-8ft", 9: "6-10ft", 10: "8-15ft+", 11: "8-15ft+" }
  },
  {
    name: "Santa Teresa, Costa Rica", country: "Costa Rica",
    latitude: 9.64, longitude: -85.17,
    periods: [{ type: "high", months: [2, 3, 4, 5, 6, 7, 8] }, { type: "shoulder", months: [0, 1, 9, 10, 11] }],
    swellData: { 0: "3-5ft", 1: "3-6ft", 2:"4-7ft", 3:"5-8ft", 4:"5-8ft", 5:"4-7ft", 6:"4-7ft", 7:"4-6ft", 8:"3-6ft", 9: "3-5ft", 10: "2-4ft", 11: "2-4ft" }
  },
  {
    name: "Nicaragua (Pacific Coast)", country: "Nicaragua", 
    latitude: 11.47, longitude: -86.13,
    periods: [{ type: "high", months: [3, 4, 5, 6, 7, 8, 9] }, { type: "shoulder", months: [2, 10] }],
    swellData: { 0:"2-4ft", 1:"2-4ft", 2: "3-6ft", 3: "4-8ft", 4:"5-8ft+", 5:"5-8ft+", 6:"5-8ft+", 7:"4-7ft", 8:"4-7ft", 9:"3-6ft", 10: "3-5ft", 11:"2-4ft" }
  },
  {
    name: "El Salvador (La Libertad area)", country: "El Salvador",
    latitude: 13.49, longitude: -89.32,
    periods: [{ type: "high", months: [2, 3, 4, 5, 6, 7, 8, 9] }, { type: "shoulder", months: [1, 10] }],
    swellData: { 0:"2-4ft", 1: "3-5ft", 2: "4-7ft", 3:"5-8ft+", 4:"6-10ft", 5:"6-10ft", 6:"5-8ft", 7:"5-8ft", 8:"4-7ft", 9:"3-6ft", 10: "3-5ft", 11:"2-4ft" }
  },
  {
    name: "Arugam Bay, Sri Lanka", country: "Sri Lanka",
    latitude: 6.8418, longitude: 81.8304,
    periods: [{ type: "high", months: [4, 5, 6, 7, 8] }, { type: "shoulder", months: [3, 9] }], // Main season May-Sep
    swellData: { 0:"1-3ft", 1:"1-3ft", 2:"2-4ft", 3: "3-6ft", 4: "4-8ft", 5: "4-8ft", 6: "4-8ft", 7: "3-6ft", 8: "3-6ft", 9: "2-5ft", 10:"1-3ft", 11:"1-3ft" }
  },
  {
    name: "Baja California (Pacific Sur), Mexico", country: "Mexico", // Approx Todos Santos / Cerritos
    latitude: 23.35, longitude: -110.18,
    periods: [{ type: "high", months: [3, 4, 5, 6, 7, 8, 9] }, { type: "shoulder", months: [2, 10] }], // South swells
    swellData: { 0:"3-6ft (N)", 1:"3-6ft (N)", 2: "4-7ft", 3: "5-8ft", 4: "6-10ft", 5: "6-10ft", 6: "5-8ft", 7: "5-8ft", 8: "4-7ft", 9: "4-7ft", 10: "3-6ft", 11:"3-6ft (N)" }
  }
];