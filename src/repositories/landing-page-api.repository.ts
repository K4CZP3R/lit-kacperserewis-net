import { FETCH_SERVICE } from "../helpers/di-names.helper";
import { IApiResponseModel } from "../models/api-response.model";
import { ILandingPageModel } from "../models/landing-page.model";
import { Inject } from "../services/dependency-provider.service";
import { IFetchService } from "../services/interfaces/fetch.service.interface";
import { Logging } from "../services/logging.service";
import { ILandingPageRepository } from "./interfaces/landing-page.repository.interface";

export class LandingPageApiRepository implements ILandingPageRepository {

    @Inject<IFetchService>(FETCH_SERVICE)
    fetchService!: IFetchService;



    async getLandingPage(): Promise<ILandingPageModel> {
        Logging.log("Fetching landing page from api");
        return (await this.fetchService.get<IApiResponseModel<ILandingPageModel>>(`${process.env.API_URL}/LandingPage`)).data;
    }
}