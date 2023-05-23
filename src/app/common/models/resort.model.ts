import { HttpResponse } from "src/app/core/models/http-response.model";
import { AccountModel } from "./account.model";
import { TourismModel } from "./tourism.model";

export interface ResortModel {
    id: string, 
    name: string,
    tourism: TourismModel,
    price: number,
    address: string,
    reservationLimit: number,
    reservations: AccountModel[],
    phone: string
}

export interface ResortDTOModel {
    id: string, 
    name: string,
    tourismId: string,
    price: number,
    address: string,
    reservationLimit: number,
    reservationsId: string[],
    phone: string
}

export type ResortResponse = HttpResponse<ResortModel>