export default function(state = [], action) {
    switch (action.type) {
        case "GET_PATTERN_ETA_ANALYTICS":
            return action.payload;
        default: return state;
    }
}