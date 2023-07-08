import { env } from "src/environments/environment.development";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {
    public static TOURISM = env.API.concat(ApiPathConfig.pages.tourism);
    public static CATEGORY = env.API.concat(ApiPathConfig.common.category);
    public static RESORT = env.API.concat(ApiPathConfig.pages.resort);
    public static SERVICE = env.API.concat(ApiPathConfig.pages.service);
    public static ROOM = env.API.concat(ApiPathConfig.pages.room);
    public static TRIP = env.API.concat(ApiPathConfig.pages.trip);
    public static FAVOURITE = env.API.concat(ApiPathConfig.pages.favourite);
    public static POST = env.API.concat(ApiPathConfig.pages.post);

    // Account
    public static ACCOUNT = env.API.concat(ApiPathConfig.auth.account);
    public static AUTH_ACCOUNT = env.API.concat(ApiPathConfig.auth.auth_account);
    public static AUTH_FAVOURITE = env.API.concat(ApiPathConfig.auth.auth_favourite);
    public static AUTH_TRIPS = env.API.concat(ApiPathConfig.auth.auth_trip);
    public static LOGIN = env.API.concat(ApiPathConfig.auth.login);
    public static REGISTER = env.API.concat(ApiPathConfig.auth.register);
    public static UPDATE_INFO = env.API.concat(ApiPathConfig.auth.update);
    public static UPDATE_AVATAR = env.API.concat(ApiPathConfig.auth.update_avatar);
    public static UPDATE_BACKGROUND = env.API.concat(ApiPathConfig.auth.update_background);
    public static CHANGE_PASS = env.API.concat(ApiPathConfig.auth.change_pass);
    public static TOURISM_BY_ACCOUNT = env.API.concat(ApiPathConfig.auth.tourism_by_account);
    public static RESORT_BY_ACCOUNT = env.API.concat(ApiPathConfig.auth.resort_by_account);
    public static SERVICE_BY_ACCOUNT = env.API.concat(ApiPathConfig.auth.service_by_account);

    // Review
    public static REVIEW = env.API.concat(ApiPathConfig.pages.review);
    public static WRITE_REVIEW_TOURISM = env.API.concat(ApiPathConfig.pages.write_review_tourism);
    public static WRITE_REVIEW_RESORT = env.API.concat(ApiPathConfig.pages.write_review_resort);
    public static REVIEW_CLASSIFY = env.TEXT_CLASSIFY_FASTAPI.concat(ApiPathConfig.model.text_classify);
    public static REVIEW_STATISTICS = env.API.concat(ApiPathConfig.pages.review_statistics);
    public static TOURISM_REVIEW_TOP = env.API.concat(ApiPathConfig.pages.tourism_review_top);
    public static RESORT_REVIEW_TOP = env.API.concat(ApiPathConfig.pages.resort_review_top);

}