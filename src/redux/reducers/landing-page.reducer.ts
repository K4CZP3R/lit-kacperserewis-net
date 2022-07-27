import { fetchWrapper } from "../../helpers/fetch";
import { IApiResponseModel } from "../../models/api-response.model";
import { ILandingPageModel } from "../../models/landing-page.model";

export const FETCH_LANDING_PAGE = "FETCH_LANDING_PAGE";
export const FETCH_LANDING_PAGE_ERROR = "FETCH_LANDING_PAGE_ERROR";

export const fetchLandingPageCms = () => {
    return async function (dispatch: any) {
        try {
            let data = await fetchWrapper<IApiResponseModel<ILandingPageModel>>(`${process.env.API_URL}/LandingPage`);

            dispatch({
                type: FETCH_LANDING_PAGE,
                payload: data.data
            });
        }
        catch (e: any) {
            dispatch({ type: FETCH_LANDING_PAGE_ERROR, error: e })
        }
    }
}


const INITIAL_STATE: { landingPage: ILandingPageModel; error: string | undefined; default: boolean } = {
    landingPage: {
        mainText: "Kacper Serewiś",
        subText: "Junior Software Developer",
        botText: "Student at Fontys, working part-time as developer at Stofloos"
    },
    default: true,
    error: undefined
}


export const landingPageReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case FETCH_LANDING_PAGE:
            return {
                ...state,
                landingPage: action.payload,
                error: undefined,
                default: false
            }
        case FETCH_LANDING_PAGE_ERROR:
            return {
                ...state,
                landingPage: INITIAL_STATE.landingPage,
                error: action.error,
                default: true
            }
        default:
            return state;
    }
}