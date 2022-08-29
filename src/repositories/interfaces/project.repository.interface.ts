import { IProjectModel } from "../../models/project.model";

export interface IProjectRepository {
    getAllProjects(): Promise<IProjectModel[]>;
}