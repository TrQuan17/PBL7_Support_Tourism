import { HttpResponse } from "src/app/core/models/http-response.model";
import { ResortModel } from "./resort.model";
import { TourismModel } from "./tourism.model";

export interface ReviewStatisticsModel {
    _id?: string,
    type: 'tourisms' | 'resorts',
    typeRef: TourismModel | ResortModel,
    positivePercent: number
}

export type ReviewStatisticsResponse = HttpResponse<ReviewStatisticsModel>