import { GET_TRIP_STOPS } from "../actions/index";

export default function(state = [], action) {
    switch (action.type) {
        case GET_TRIP_STOPS:
            return action.payload.data;
        default: return state;
    }
};