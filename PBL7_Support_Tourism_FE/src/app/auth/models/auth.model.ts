import { HttpResponse } from "src/app/core/models/http-response.model"

export interface LoginRequestModel {
    username: string,
    password: string
}

export interface RegisterRequestModel {
    avatar: string,
    background: string,
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

export enum Role {
    admin = 'Quản trị viên',
    tourism_manager = 'Quản lý điểm du lịch',
    resort_manager = 'Quản lý khu nghỉ dưỡng',
    user = 'Người dùng'
}

export type RoleKey = keyof typeof Role;

export type AuthResponse = HttpResponse<AuthModel>
