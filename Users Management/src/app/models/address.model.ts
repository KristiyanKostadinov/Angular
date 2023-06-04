import { GeoLocation } from "./geo.model";

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocation;
}