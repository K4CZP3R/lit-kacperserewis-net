import { FETCH_SERVICE } from '../helpers/di-names.helper';
import { IApiResponseModel } from '../models/api-response.model';
import { IPostModel } from '../models/post.model';
import { Inject } from '../services/dependency-provider.service';
import { IFetchService } from '../services/interfaces/fetch.service.interface';
import { Logging } from '../services/logging.service';
import { IPostRepository } from './interfaces/post.repository.interface';

export class PostApiRepository implements IPostRepository {



    @Inject<IFetchService>(FETCH_SERVICE)
    fetchService!: IFetchService;

    async getAllPosts(): Promise<IPostModel[]> {
        Logging.log('Fetching posts from api');
        return (await this.fetchService.get<IApiResponseModel<IPostModel[]>>(`${process.env.API_URL}/Post?fields=*.*`)).data;

    }
    async getPostBy(key: string, val: string): Promise<IPostModel[]> {
        Logging.log('Searching ', key, '=', val, ' in projects from api');
        return (await this.fetchService.get<IApiResponseModel<IPostModel[]>>(`${process.env.API_URL}/Project?filter[${key}][_eq]=${val}&fields=*.*`)).data;

    }


}