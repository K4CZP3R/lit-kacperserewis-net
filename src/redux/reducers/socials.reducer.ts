export const FETCH_SOCIALS = "FETCH_SOCIALS";

export const fetchSocials = () => {
    return function (dispatch: any) {
        fetch('https://strapi.kacperserewis.net/api/social-medias?pagination[page]=1&pagination[pageSize]=25')
            .then(resp => resp.json())
            .then(data => data.data)
            .then(data => data.map((strapi: any) => strapi.attributes))
            .then(socials => dispatch({ type: FETCH_SOCIALS, payload: socials }))
    }


}

const INITIAL_STATE: { socials: any[] } = {
    socials: []
}


export const socialsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case FETCH_SOCIALS:
            return {
                ...state,
                socials: action.payload
            }
        default:
            return state;
    }
}