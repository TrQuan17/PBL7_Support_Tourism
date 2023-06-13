import { env } from "src/environments/environment.development";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {
    public static TOURISM = env.API.concat(ApiPathConfig.pages.tourism);
    public static CATEGORY = env.API.concat(ApiPathConfig.common.category);
    public static RESORT = env.API.concat(ApiPathConfig.pages.resort);
    public static SERVICE = env.API.concat(ApiPathConfig.pages.service);
    public static FAVOURITE = env.API.concat(ApiPathConfig.pages.favourite);

    // Account
    public static ACCOUNT = env.API.concat(ApiPathConfig.auth.account);
    public static AUTH_ACCOUNT = env.API.concat(ApiPathConfig.auth.auth_account);
    public static LOGIN = env.API.concat(ApiPathConfig.auth.login);
    public static REGISTER = env.API.concat(ApiPathConfig.auth.register);
    public static UPDATE_INFO = env.API.concat(ApiPathConfig.auth.update);
    public static CHANGE_PASS = env.API.concat(ApiPathConfig.auth.change_pass);
    public static TOURISM_BY_ACCOUNT = env.API.concat(ApiPathConfig.auth.tourism_by_account);
    public static RESORT_BY_ACCOUNT = env.API.concat(ApiPathConfig.auth.resort_by_account);
    public static SERVICE_BY_ACCOUNT = env.API.concat(ApiPathConfig.auth.service_by_account);

    // Review
    public static REVIEW = env.API.concat(ApiPathConfig.pages.review);
    public static WRITE_REVIEW_TOURISM = env.API.concat(ApiPathConfig.pages.write_review_tourism);
    public static WRITE_REVIEW_RESORT = env.API.concat(ApiPathConfig.pages.write_review_resort);

}