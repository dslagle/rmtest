import { GET_ACTUAL_STOPS } from "../actions/index";

export default function(state = [], action) {
    switch (action.type) {
        case GET_ACTUAL_STOPS:
            return action.payload.data;
        default: return state;
    }
};