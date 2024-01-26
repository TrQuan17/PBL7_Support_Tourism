import { HttpResponse } from "src/app/core/models/http-response.model";
import { TourismModel } from "./tourism.model";

export interface ResortModel {
    _id?: string, 
    account?: string,
    name: string,
    address: string,
    images: string[],
    about: string,
    tourism: TourismModel | string,
    price: number,
    reservationLimit?: number,
    reservationsNum?: number,
    phone: string,
    rate: 0,
    votesNum: 0
}

export type ResortResponse = HttpResponse<ResortModel>