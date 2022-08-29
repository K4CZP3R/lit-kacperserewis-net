
import { SOCIALS_REPOSITORY } from "../../helpers/di-names.helper";
import { ISocialRepository } from "../../repositories/interfaces/social.repository.interface";
import { DependencyProviderService } from "../../services/dependency-provider.service";
import { Logging } from "../../services/logging.service";

export const FETCH_SOCIALS = "FETCH_SOCIALS";
export const FETCH_SOCIALS_ERROR = "FETCH_SOCIALS_ERROR";

export const fetchSocials = () => {
    Logging.log("Fetching socials");
    return async function (dispatch: any) {
        try {
            const data = await DependencyProviderService.getImpl<ISocialRepository>(SOCIALS_REPOSITORY).getAllSocials()
            dispatch({
                type: FETCH_SOCIALS,
                payload: data
            });
        } catch (e: any) {
            dispatch({
                type: FETCH_SOCIALS_ERROR,
                error: e
            });
        }
    }
}

const INITIAL_STATE: { socials: any[], error: string | undefined } = {
    socials: [],
    error: undefined
}


export const socialsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case FETCH_SOCIALS:
            return {
                ...state,
                socials: action.payload,
                error: undefined
            }
        case FETCH_SOCIALS_ERROR:
            return {
                ...state,
                socials: [],
                error: action.error
            }
        default:
            return state;
    }
}