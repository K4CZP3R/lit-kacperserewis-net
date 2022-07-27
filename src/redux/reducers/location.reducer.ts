export const CHANGE_LOCATION = "CHANGE_LOCATION";
export const SET_META = "SET_META";

export const setMeta = (title: string, description: string) => {
    return {
        type: SET_META,
        title: title,
        description: description
    }
}

export const changeLocation = (newLocation: string) => {
    return {
        type: CHANGE_LOCATION,
        newLocation: newLocation
    }
}

const INITIAL_STATE: { location: string; title: string; description: string } = {
    location: "/",
    title: "kacperserewis.net",
    description: "My personal website"
}

export const locationReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case CHANGE_LOCATION:
            return {
                ...state,
                location: action.newLocation
            }
        case SET_META:
            return {
                ...state,
                title: action.title,
                description: action.description
            }
        default:
            return state;
    }
}