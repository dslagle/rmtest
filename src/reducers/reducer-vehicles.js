import { GET_VEHICLES } from "../actions/index";

export default function(state = [{ name: "V1" }, { name: "V2" }], action) {
    switch (action.type) {
        case GET_VEHICLES:
            return [ action.payload.data, ...state ];
        default: return state;
    }
};