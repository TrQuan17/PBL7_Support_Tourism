import { HttpResponse } from "src/app/core/models/http-response.model"

export interface LoginRequestModel {
    username: string,
    password: string
}

export interface RegisterRequestModel {
    username: string,
    fullname: string,
    email: string,
    password: string,
    rePass: string
}

export interface AuthModel {
    fullname: string,
    avatar: string,
    accessToken: string,
    expiresIn: number
}

export type AuthResponse = HttpResponse<AuthModel>
