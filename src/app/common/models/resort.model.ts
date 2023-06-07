import { HttpResponse } from "src/app/core/models/http-response.model";
import { AccountModel } from "./account.model";
import { TourismModel } from "./tourism.model";

export interface ResortModel {
    _id: string, 
    name: string,
    images: string[],
    about: string,
    tourism: TourismModel | string,
    price: number,
    address: string,
    reservationLimit: number,
    reservations: AccountModel[] | string[],
    phone: string,
    rate: number,
    votesNum: number
}

export type ResortResponse = HttpResponse<ResortModel>