import { HttpResponse } from "src/app/core/models/http-response.model";
import { FavouriteModule } from "src/app/pages/favourite/favourite.module";
import { AccountModel } from "./account.model";

export interface TripModel {
    _id?: string,
    account?: AccountModel | string,
    name: string,
    about: string,
    background: string,
    favourites: FavouriteModule[] | string[]
}

export type TripResponse = HttpResponse<TripModel>