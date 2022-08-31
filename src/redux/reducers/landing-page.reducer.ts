import { AnyAction, Dispatch } from 'redux';
import { LANDING_PAGE_REPOSITORY } from '../../helpers/di-names.helper';
import { ILandingPageModel } from '../../models/landing-page.model';
import { ILandingPageRepository } from '../../repositories/interfaces/landing-page.repository.interface';
import { DependencyProviderService } from '../../services/dependency-provider.service';
import { Logging } from '../../services/logging.service';


interface ActionFetchLandingPage extends AnyAction {
    type: 'FETCH_LANDING_PAGE';
    payload: ILandingPageModel;
}

interface ActionFetchLandingPageError extends AnyAction {
    type: 'FETCH_LANDING_PAGE_ERROR';
    error: string;
}

function matchFetchLandingPage(action: AnyAction): action is ActionFetchLandingPage {
    return action.type === 'FETCH_LANDING_PAGE';
}

function matchFetchLandingPageError(action: AnyAction): action is ActionFetchLandingPageError {
    return action.type === 'FETCH_LANDING_PAGE_ERROR';
}

type Action = ActionFetchLandingPage | ActionFetchLandingPageError;

export const fetchLandingPageCms = () => {
    Logging.log('Fetching landing page');
    return async function (dispatch: Dispatch<Action>) {
        try {
            const data = await DependencyProviderService.getImpl<ILandingPageRepository>(LANDING_PAGE_REPOSITORY).getLandingPage();
            dispatch({
                type: 'FETCH_LANDING_PAGE',
                payload: data
            });
        }
        catch (e: unknown) {
            dispatch({ type: 'FETCH_LANDING_PAGE_ERROR', error: e as string });
        }
    };
};


const INITIAL_STATE: { landingPage?: ILandingPageModel; error: string | undefined;  } = {
    landingPage: undefined,
    error: undefined
};


export const landingPageReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if (matchFetchLandingPage(action)) {
        return { ...state, landingPage: action.payload, error: undefined};
    }
    if (matchFetchLandingPageError(action)) {
        return { ...state, landingPage: INITIAL_STATE.landingPage, error: action.error };
    }
    return state;
    
};