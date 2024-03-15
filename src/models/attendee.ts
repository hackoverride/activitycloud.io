import { Location } from "./location";
import { Segment } from "./segment";

export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  status: string;
  date: Date;
  time: number;
  segment: Segment;
  location: Location;
}
