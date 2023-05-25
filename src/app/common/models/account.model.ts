import { HttpResponse } from "src/app/core/models/http-response.model"

export interface AccountModel {
    _id: string,
    username: string,
    password: string,
    fullname: string,
    avatar: string,
    address: string,
    email: string,
    phone: string,
    role: string
}

export type AccountResponse = HttpResponse<AccountModel>