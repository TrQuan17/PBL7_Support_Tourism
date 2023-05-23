import { HttpResponse } from "src/app/core/models/http-response.model";
import { AccountModel } from "./account.model";
import { ResortModel } from "./resort.model";
import { TourismModel } from "./tourism.model";

export interface ReviewModel {
    id: string,
    account: AccountModel,
    vote: number,
    text: string,
    images: string[],
    like: string[],
    dislike: string[],
    tourism?: TourismModel,
    resort?: ResortModel
}

export interface ReviewDTOModel {
    id: string,
    accountId: string,
    vote: number,
    text: string,
    images: string[],
    like: string[],
    dislike: string[],
    tourismId?: string,
    resortId?: string
}

export type ReviewResponse = HttpResponse<ReviewModel>