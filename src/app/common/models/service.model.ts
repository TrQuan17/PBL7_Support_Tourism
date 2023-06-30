import { HttpResponse } from "src/app/core/models/http-response.model"
import { ResortModel } from "./resort.model"

export interface ServiceModel {
    _id?: string,
    account?: string,
    name: string,
    resort: ResortModel | string,
    about: string,
    image: string,
    price: string
}

export type ServiceResponse = HttpResponse<ServiceModel>