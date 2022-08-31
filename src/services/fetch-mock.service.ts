import { IApiResponseModel } from '../models/api-response.model';
import { ISocialModel } from '../models/social.model';
import { IFetchService } from './interfaces/fetch.service.interface';
import { Logging } from './logging.service';

const SOCIALS_MOCK: IApiResponseModel<ISocialModel[]> = {
    data: [{ id: '', name: 'Mock 1: ' + new Date().getSeconds(), url: '' }, { id: '', name: 'Mock 2: ' + new Date().getSeconds(), url: '' },]
};

export class FetchMockService implements IFetchService {
    async get<T>(url: string): Promise<T> {
        Logging.log('Fetching from mock service', url);
        switch (url) {
            case 'https://99sxsqgh.directus.app/items/Socials':
                return SOCIALS_MOCK as unknown as T;
            case 'https://99sxsqgh.directus.app/items/LandingPage':
            default:
                throw new Error('Failed to mock ' + url);
        }
    }

}