import { FETCH_SERVICE } from '../helpers/di-names.helper';
import { IApiResponseModel } from '../models/api-response.model';
import { IProjectModel } from '../models/project.model';
import { Inject } from '../services/dependency-provider.service';
import { IFetchService } from '../services/interfaces/fetch.service.interface';
import { Logging } from '../services/logging.service';
import { IProjectRepository } from './interfaces/project.repository.interface';

export class ProjectApiRepository implements IProjectRepository {


    @Inject<IFetchService>(FETCH_SERVICE)
    fetchService!: IFetchService;


    async getAllProjects(): Promise<IProjectModel[]> {
        Logging.log('Fetching projects from api');
        return (await this.fetchService.get<IApiResponseModel<IProjectModel[]>>(`${process.env.API_URL}/Project?fields=*.*`)).data;

    }

    async findBy(key: string, val: string): Promise<IProjectModel[]> {
        Logging.log('Searching ', key, '=', val, ' in projects from api');
        return (await this.fetchService.get<IApiResponseModel<IProjectModel[]>>(`${process.env.API_URL}/Project?filter[${key}][_eq]=${val}&fields=*.*`)).data;
    }
    getById(id: string): Promise<IProjectModel> {
        Logging.log('Getting project with id ', id, ' from api');
        return this.fetchService.get<IApiResponseModel<IProjectModel>>(`${process.env.API_URL}/Project/${id}?fields=*.*`).then(res => res.data);
    }

}