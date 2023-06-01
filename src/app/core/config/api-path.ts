import { env } from "src/environments/environment.development";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {
    public static TOURISM = env.API.concat(ApiPathConfig.pages.tourism);
    public static CATEGORY = env.API.concat(ApiPathConfig.common.category);
    public static REVIEW = env.API.concat(ApiPathConfig.pages.review);
    public static RESORT = env.API.concat(ApiPathConfig.pages.resort);
    public static SERVICE = env.API.concat(ApiPathConfig.pages.service);
    public static FAVOURITE = env.API.concat(ApiPathConfig.pages.favourite);

    // Account
    public static ACCOUNT = env.API.concat(ApiPathConfig.auth.account);
    public static LOGIN = env.API.concat(ApiPathConfig.auth.login);
    public static REGISTER = env.API.concat(ApiPathConfig.auth.register);
    public static UPDATE_INFO = env.API.concat(ApiPathConfig.auth.update);
    public static CHANGE_PASS = env.API.concat(ApiPathConfig.auth.change_pass);

}