
import { AnyAction, Dispatch } from 'redux';
import { SOCIALS_REPOSITORY } from '../../helpers/di-names.helper';
import { ISocialModel } from '../../models/social.model';
import { ISocialRepository } from '../../repositories/interfaces/social.repository.interface';
import { DependencyProviderService } from '../../services/dependency-provider.service';
import { Logging } from '../../services/logging.service';


interface ActionFetchSocials extends AnyAction {
    type: 'FETCH_SOCIALS';
    payload: ISocialModel[];
}
interface ActionFetchSocialsError extends AnyAction {
    type: 'FETCH_SOCIALS_ERROR';
    error: string;
}

function matchFetchSocials(action: AnyAction): action is ActionFetchSocials {
    return action.type === 'FETCH_SOCIALS';
}

function matchFetchSocialsError(action: AnyAction): action is ActionFetchSocialsError {
    return action.type === 'FETCH_SOCIALS_ERROR';
}

type Action = ActionFetchSocials | ActionFetchSocialsError;

export const fetchSocials = () => {
    Logging.log('Fetching socials');
    return async function (dispatch: Dispatch<Action>) {
        try {
            const data = await DependencyProviderService.getImpl<ISocialRepository>(SOCIALS_REPOSITORY).getAllSocials();
            dispatch({
                type: 'FETCH_SOCIALS',
                payload: data
            });
        } catch (e: unknown) {
            dispatch({
                type: 'FETCH_SOCIALS_ERROR',
                error: e as string
            });
        }
    };
};

const INITIAL_STATE: { socials: ISocialModel[], error: string | undefined } = {
    socials: [],
    error: undefined
};


export const socialsReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if (matchFetchSocials(action)) {
        return { ...state, socials: action.payload, error: undefined };
    }
    if (matchFetchSocialsError(action)) {
        return { ...state, socials: [], error: action.error };
    }
    return state;
};