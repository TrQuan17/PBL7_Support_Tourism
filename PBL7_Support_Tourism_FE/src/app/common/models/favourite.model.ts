import { HttpResponse } from "src/app/core/models/http-response.model";
import { AccountModel } from "./account.model";
import { TourismModel } from "./tourism.model";

export interface FavouriteModel {
    _id?: string,
    account?: AccountModel | string,
    tourism: TourismModel | string
}

export type FavouriteResponse = HttpResponse<FavouriteModel>