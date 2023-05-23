import { env } from "src/environments/environment.development";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {
    public static TOURISM = env.API.concat(ApiPathConfig.pages.tourism)
    public static CATEGORY = env.API.concat(ApiPathConfig.common.category)
}