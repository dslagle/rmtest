import { GET_ACTUAL_PROBLEMS } from "../actions/constants";

export default function(state = [], action) {
    switch (action.type) {
        case GET_ACTUAL_PROBLEMS:
            return action.payload.data;
        default: return state;
    }
};