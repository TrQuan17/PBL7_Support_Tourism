import { HttpResponse } from "src/app/core/models/http-response.model";
import { AccountModel } from "./account.model";
import { ResortModel } from "./resort.model";
import { TourismModel } from "./tourism.model";

export interface ReviewModel {
    _id?: string,
    account?: AccountModel | string,
    vote: number,
    title: string,
    text: string,
    images: string[],
    time: Date,
    like?: string[],
    dislike?: string[],
    tourism?: TourismModel | string,
    resort?: ResortModel | string
}

export interface RatesNumModel {
    excellent: number,
    veryGood: number,
    average: number,
    unsatisfactory: number,
    terrible: number
}

export type ReviewResponse = HttpResponse<ReviewModel>