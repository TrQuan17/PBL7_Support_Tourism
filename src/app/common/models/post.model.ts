import { HttpResponse } from "src/app/core/models/http-response.model"
import { AccountModel } from "./account.model"

export interface PostModel {
    _id?: string,
    account?: AccountModel | string,
    title: string, 
    content: string,
    images?: string[],
    createdAt?: Date
}

export type PostResponse = HttpResponse<PostModel>