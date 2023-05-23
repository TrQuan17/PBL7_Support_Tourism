import { HttpResponse } from "src/app/core/models/http-response.model";
import { AccountModel } from "./account.model";
import { TourismModel } from "./tourism.model";

export interface FavouriteModel {
    id: string,
    account: AccountModel,
    tourism: TourismModel
}

export interface FavouriteDTOModel {
    id: string,
    accountId: string,
    tourismId: string
}

export type FavouriteResponse = HttpResponse<FavouriteModel>