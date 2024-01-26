import { HttpResponse } from "src/app/core/models/http-response.model";


export interface RoomModel {
    _id?: string,
    name: string,
    image?: string,
    price: number,
    limit: number, 
    count?: number,
    resort: string
}

export type RoomResponse = HttpResponse<RoomModel>