export const CHANGE_LOCATION = "CHANGE_LOCATION";

export const changeLocation = (newLocation: string) => {
    return {
        type: CHANGE_LOCATION,
        newLocation: newLocation
    }
}

const INITIAL_STATE: { location: string } = {
    location: "/"
}

export const locationReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case CHANGE_LOCATION:
            return {
                ...state,
                location: action.newLocation
            }
        default:
            return state;
    }
}