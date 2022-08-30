import { AnyAction, Dispatch } from 'redux';
import { Logging } from '../../services/logging.service';

interface ActionChangeLocation extends AnyAction {
    type: 'CHANGE_LOCATION';
    newLocation: string;
}

interface ActionSetMeta extends AnyAction {
    type: 'SET_META';
    title: string;
    description: string;
}

function matchChangeLocation(action: AnyAction): action is ActionChangeLocation {
    return action.type === 'CHANGE_LOCATION';
}

function matchSetMeta(action: AnyAction): action is ActionSetMeta {
    return action.type === 'SET_META';
}

type Action = ActionChangeLocation | ActionSetMeta;

export const setMeta = (title: string, description: string) => {
    Logging.log('Setting meta', title, description);

    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: 'SET_META',
            title,
            description
        });
    };
};

export const changeLocation = (newLocation: string) => {
    Logging.log('Changing location', newLocation);

    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: 'CHANGE_LOCATION',
            newLocation
        });
    };
};

const INITIAL_STATE: { location: string; title: string; description: string } = {
    location: '/',
    title: 'kacperserewis.net',
    description: 'My personal website'
};

export const locationReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(matchChangeLocation(action)) {
        return {...state, location: action.newLocation};
    }
    if(matchSetMeta(action)) {
        return {...state, title: action.title, description: action.description};
    }
    return state;
};