import { IProjectModel } from '../../models/project.model';

export interface IProjectRepository {
    getAllProjects(): Promise<IProjectModel[]>;
    findBy(key: string, val: string): Promise<IProjectModel[]>;
    getById(id: string): Promise<IProjectModel>;

}