/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthModel } from "src/app/auth/models/auth.model";

@Injectable()
export class JsonTokenWebInterceptor implements HttpInterceptor {

    public intercept(request: HttpRequest<any>, next: HttpHandler) {
        const jsonStr = localStorage.getItem('account');

        if (jsonStr !== null) {
            const currentAccount = JSON.parse(jsonStr) as AuthModel;

            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentAccount.accessToken
                }
            })
        }

        return next.handle(request);
    }

}
