import { HttpResponse } from "src/app/core/models/http-response.model";
import { CategoryModel } from "./category.model";

export interface TourismModel {
    _id: string,
    name: string,
    address: string,
    images: string[],
    title: string,
    about: string,
    category: CategoryModel | string,
    votesNum: number,
    rate: number,

}

export type TourismResponse = HttpResponse<TourismModel>