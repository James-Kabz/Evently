export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  image: string;
  location: string;
  user_id: number;
}

export interface TicketType {
  id: number;
  name: string;
  price: number;
  complimentary: boolean;
  active: boolean;
  user_id: number;
  event_id: number;
}


