import { env } from "src/environments/environment.development";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {
    public static TOURISM = env.API.concat(ApiPathConfig.pages.tourism);
    public static CATEGORY = env.API.concat(ApiPathConfig.common.category);
    public static REVIEW = env.API.concat(ApiPathConfig.pages.review);
    public static RESORT = env.API.concat(ApiPathConfig.pages.resort);
    public static SERVICE = env.API.concat(ApiPathConfig.pages.service);
    public static FAVOURITE = env.API.concat(ApiPathConfig.pages.favourite);
    public static ACCOUNT = env.API.concat(ApiPathConfig.auth.account);
}