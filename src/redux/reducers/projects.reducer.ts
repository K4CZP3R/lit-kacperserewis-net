import { AnyAction, Dispatch } from 'redux';
import { PROJECTS_REPOSITORY } from '../../helpers/di-names.helper';
import { IProjectModel } from '../../models/project.model';
import { IProjectRepository } from '../../repositories/interfaces/project.repository.interface';
import { DependencyProviderService } from '../../services/dependency-provider.service';
import { Logging } from '../../services/logging.service';

interface ActionFetchProject extends AnyAction {
    type: 'FETCH_PROJECT';
    payload: IProjectModel;
}

interface ActionFetchProjects extends AnyAction {
    type: 'FETCH_PROJECTS';
    payload: IProjectModel[];
}

interface ActionFetchProjectxError extends AnyAction {
    type: 'FETCH_PROJECTX_ERROR';
    error: string;
}

function matchFetchProject(action: AnyAction): action is ActionFetchProject {
    return action.type === 'FETCH_PROJECT';
}

function matchFetchProjects(action: AnyAction): action is ActionFetchProjects {
    return action.type === 'FETCH_PROJECTS';
}

function matchFetchProjectxError(action: AnyAction): action is ActionFetchProjectxError {
    return action.type === 'FETCH_PROJECTX_ERROR';
}

type Action = ActionFetchProject | ActionFetchProjects | ActionFetchProjectxError;


export const fetchProject = (projectTitle: string) => {
    Logging.log('Finding project with title ', projectTitle);
    return async function (dispatch: Dispatch<Action>) {
        try {
            const data = await DependencyProviderService.getImpl<IProjectRepository>(PROJECTS_REPOSITORY).findBy('title', projectTitle);

            if (data.length <= 0) {
                throw new Error('Project not found');
            }


            const projectData = await DependencyProviderService.getImpl<IProjectRepository>(PROJECTS_REPOSITORY).getById(data[0].id);
            dispatch({
                type: 'FETCH_PROJECT',
                payload: projectData
            });
        }
        catch (error: unknown) {
            dispatch({
                type: 'FETCH_PROJECTX_ERROR',
                error: error as string
            });
        }
    };
};

export const fetchProjects = () => {
    Logging.log('Fetching projects');
    return async function (dispatch: Dispatch<Action>) {
        try {

            const data = await DependencyProviderService.getImpl<IProjectRepository>(PROJECTS_REPOSITORY).getAllProjects();

            dispatch({
                type: 'FETCH_PROJECTS',
                payload: data
            });

        } catch (e: unknown) {
            dispatch({
                type: 'FETCH_PROJECTX_ERROR',
                error: e as string
            });
        }
    };
};

const INITIAL_STATE: { projects: IProjectModel[], currentProject?: IProjectModel, error: string | undefined } = {
    projects: [],
    currentProject: undefined,
    error: undefined
};

export const projectsReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(matchFetchProject(action)) {
        return {...state, currentProject: action.payload, error: undefined};
    }
    if(matchFetchProjects(action)) {
        return {...state, projects: action.payload, error: undefined};
    }
    if(matchFetchProjectxError(action)) {
        return {...state, projects: [], currentProject: undefined, error: action.error};
    }
    return state;
};