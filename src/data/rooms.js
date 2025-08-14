// Mock data for hotel rooms
export const rooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    type: "Suite",
    price: 299,
    servant: "John Doe",
    servantContact: 45,
    roomno: "2",
    description: "Spacious suite with separate living area, perfect for families or extended stays.",
  
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    available: true
  }
  
];

export const roomTypes = ["All", "Suite", "Standard", "Business", "Family"];
