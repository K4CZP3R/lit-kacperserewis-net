
import { fetchWrapper } from "../../helpers/fetch";
import { IApiResponseModel } from "../../models/api-response.model";
import { ISocialModel } from "../../models/social.model";

export const FETCH_SOCIALS = "FETCH_SOCIALS";
export const FETCH_SOCIALS_ERROR = "FETCH_SOCIALS_ERROR";

export const fetchSocials = () => {
    return async function (dispatch: any) {
        try {

            let data = await fetchWrapper<IApiResponseModel<ISocialModel[]>>(`${process.env.API_URL}/Socials`);

            dispatch({
                type: FETCH_SOCIALS,
                payload: data.data
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