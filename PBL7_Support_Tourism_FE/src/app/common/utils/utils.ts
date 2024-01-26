import { AuthModel } from "src/app/auth/models/auth.model";

export class Utils {
    public static isCurrentAccount(): AuthModel | undefined {
        let account = undefined;
        const jsonStr = localStorage.getItem('account');
        if(jsonStr !== null) {
            account = JSON.parse(jsonStr) as AuthModel;
    
            const isEmptyVal = !account?.accessToken
                || !account?.expiresIn
    
            if(isEmptyVal || new Date().getTime() > account.expiresIn ) {
                localStorage.removeItem('account');
                account = undefined;
            }
        }
    
        return account;
    }
}

