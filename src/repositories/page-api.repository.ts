import { FETCH_SERVICE } from '../helpers/di-names.helper';
import { IApiResponseModel } from '../models/api-response.model';
import { IPageModel } from '../models/page.model';
import { Inject } from '../services/dependency-provider.service';
import { IFetchService } from '../services/interfaces/fetch.service.interface';
import { Logging } from '../services/logging.service';
import { IPageRepository } from './interfaces/page.repository.interface';

export class PageApiRepository implements IPageRepository {


    async getPage(pageId: string): Promise<IPageModel> {
        Logging.log('Fetching landing page from api');
        return (await this.fetchService.get<IApiResponseModel<IPageModel>>(`${process.env.API_URL}/Page/${pageId}`)).data;
  
    }

    @Inject<IFetchService>(FETCH_SERVICE)
    fetchService!: IFetchService;


}