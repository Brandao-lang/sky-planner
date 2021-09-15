

// Here is our initial state, no user is logged in so default values are null

const inititalState = {
    user_name: null,
    user_email: null,
    country: null,
    state: null,
    city:null,
    metric: 'F',
    isLoggedIn: false
}

// Here is our action creator which should put an object with all user info grabbed from the login form in the payload

export const getUser = userObj => {
    return {
        type:'user/getUser',
        payload: userObj
    }
}

// Reducer

export default function loggedInSlice(state = inititalState, action) {
    switch(action.type) {
        case 'user/getUser': {
            return {
                user_name: action.payload.user_name,
                user_email: action.payload.user_email,
                country: action.payload.country,
                state: action.payload.state,
                city: action.payload.city,
                metric: action.payload.metric,
                isLoggedIn: true
            }
        }
        case 'user/logout' : {
            return {
                user_name: null,
                user_email: null,
                country: null,
                state: null,
                city: null,
                isLoggedIn: false
            }
        }
        case 'user/updateUser' : {
            return {
                user_name: action.payload.profileName,
                country: action.payload.countryName,
                city: action.payload.cityName,
                isLoggedIn: false
            }
        }
        case 'user/updateMetric' : {

            let newMetric = ''

            if (state.metric === 'F') {
                newMetric = 'C'
            } else {
                newMetric = 'F'
            }

            return {
                ...state,
                    metric: newMetric
            }
        }
        default:
            return state
    }
}