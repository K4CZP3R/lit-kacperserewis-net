import { IFetchService } from './interfaces/fetch.service.interface';
import { Logging } from './logging.service';

export class FetchOnlineService implements IFetchService {
    async get<T>(url: string): Promise<T> {
        Logging.log('Fetching from online service', url);
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(await response.text());
        return await response.json() as T;
    }

}