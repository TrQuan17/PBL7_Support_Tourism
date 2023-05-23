import { HttpResponse } from "src/app/core/models/http-response.model"

export interface ServiceModel {
    id: string,
    name: string,
    resort: string,
    about: string,
    image: string,
    price: string
}

export type ServiceResponse = HttpResponse<ServiceModel>