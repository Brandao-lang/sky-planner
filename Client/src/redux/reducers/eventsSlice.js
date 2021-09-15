

const inititalState = {
    events: [],
}


export default function eventsSlice(state = inititalState, action) {
    switch(action.type) {
        case 'events/getEvents': {
            return {
                ...state, events: action.payload
            }
        }
        case 'events/addEvent': {
            return {
                ...state, events: [...state.events, action.payload]
            }
        }
        case 'events/removeEvent' : {
            let newArr = state.events.slice()
            newArr.splice(action.payload, 1)
            
            return {
                ...state,
                events: newArr
            }
        }
        case 'events/editEvent' : {
            let newArr = state.events.slice()
            newArr.splice(action.payload.index, 1, action.payload)

            return {
                ...state,
                events: newArr
            }
        }
        default:
            return state
    }
}