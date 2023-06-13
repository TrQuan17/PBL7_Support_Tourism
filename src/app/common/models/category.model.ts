import { HttpResponse } from "src/app/core/models/http-response.model"

export interface CategoryModel {
    _id?: string,
    name: string, 
    background: string,
    about: string
}

export type CategoryResponse = HttpResponse<CategoryModel>