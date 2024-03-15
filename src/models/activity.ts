import { Location } from "./location";
import { Organizer } from "./organizer";
import { Attendee } from "./attendee";

export interface Activity {
  id: string;
  category: string;
  name: string;
  description: string;
  date: Date;
  time: number;
  location: Location;
  price: number; // 0 for free
  capacity: number;
  organizer: Organizer;
  attendees: Attendee[];
  tags: string[];
  image: string;
}
