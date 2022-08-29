import { PROJECTS_REPOSITORY } from "../../helpers/di-names.helper";
import { IProjectModel } from "../../models/project.model";
import { IProjectRepository } from "../../repositories/interfaces/project.repository.interface";
import { DependencyProviderService } from "../../services/dependency-provider.service";
import { Logging } from "../../services/logging.service";

export const FETCH_PROJECTS = "FETCH_PROJECTS";
export const FETCH_PROJECTS_ERROR = "FETCH_PROJECTS_ERROR";

export const fetchProjects = () => {
    Logging.log("Fetching projects");
    return async function (dispatch: any) {
        try {

            const data = await DependencyProviderService.getImpl<IProjectRepository>(PROJECTS_REPOSITORY).getAllProjects();

            dispatch({
                type: FETCH_PROJECTS,
                payload: data
            })

        } catch (e: any) {
            dispatch({
                type: FETCH_PROJECTS_ERROR,
                error: e
            })
        }
    }
}

const INITIAL_STATE: { projects: IProjectModel[], error: string | undefined } = {
    projects: [],
    error: undefined
}

export const projectsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case FETCH_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                error: undefined
            }
        case FETCH_PROJECTS_ERROR:
            return {
                ...state,
                projects: [],
                error: action.error
            }
        default:
            return state;
    }
}