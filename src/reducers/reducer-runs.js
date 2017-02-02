import { GET_RUNS } from "../actions/index";

export default function(state = [], action) {
    switch (action.type) {
        case GET_RUNS:
            return action.payload.data;
        default: return state;
    }
};