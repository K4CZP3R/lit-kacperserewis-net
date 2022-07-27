import { fetchWrapper } from "../../helpers/fetch";
import { IApiResponseModel } from "../../models/api-response.model";
import { IProjectModel } from "../../models/project.model";

export const FETCH_PROJECTS = "FETCH_PROJECTS";
export const FETCH_PROJECTS_ERROR = "FETCH_PROJECTS_ERROR";

export const fetchProjects = () => {
    return async function (dispatch: any) {
        try {
            let data = await fetchWrapper<IApiResponseModel<IProjectModel[]>>(`${process.env.API_URL}/Project?fields=*.*`);

            dispatch({
                type: FETCH_PROJECTS,
                payload: data.data
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