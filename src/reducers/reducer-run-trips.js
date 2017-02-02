import { GET_RUN_TRIPS } from "../actions/index";

export default function(state = [], action) {
    switch (action.type) {
        case GET_RUN_TRIPS:
            return action.payload.data;
        default: return state;
    }
};