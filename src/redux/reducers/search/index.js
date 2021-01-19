const initialState="pt";

export const searchChangeNameButton = (payload) => ({
    type: "ACTION_SEARCH_BUTTON",
    payload: payload
})

export default(state=initialState, action) => {
    switch (action.type) {
        case "ACTION_SEARCH_BUTTON":
            return state = action.payload;
    
        default:
            return state;
    }
}