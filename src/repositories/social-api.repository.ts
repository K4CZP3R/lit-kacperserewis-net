import { FETCH_SERVICE } from "../helpers/di-names.helper";
import { IApiResponseModel } from "../models/api-response.model";
import { ISocialModel } from "../models/social.model";
import { Inject } from "../services/dependency-provider.service";
import { IFetchService } from "../services/interfaces/fetch.service.interface";
import { Logging } from "../services/logging.service";
import { ISocialRepository } from "./interfaces/social.repository.interface";

export class SocialApiRepository implements ISocialRepository {

    @Inject<IFetchService>(FETCH_SERVICE)
    fetchService!: IFetchService;

    async getAllSocials(): Promise<ISocialModel[]> {
        Logging.log("Fetching socials from api");
        return (await this.fetchService.get<IApiResponseModel<ISocialModel[]>>(`${process.env.API_URL}/Socials`)).data;

    }

}