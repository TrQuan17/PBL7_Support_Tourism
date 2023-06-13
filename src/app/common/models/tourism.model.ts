import { HttpResponse } from "src/app/core/models/http-response.model";
import { CategoryModel } from "./category.model";

export interface TourismModel {
    _id?: string,
    account?: string,
    name: string,
    address: string,
    images: string[],
    title: string,
    about: string,
    category: CategoryModel | string,
    votesNum: 0,
    rate: 0,

}

export type TourismResponse = HttpResponse<TourismModel>