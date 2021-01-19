const initialState = false;

export const hamburgerActionButton = (payload) => ({
    type: "HAMBURGER_ACTION",
    payload: payload
})

export default(state=initialState, action) => {
    switch (action.type) {
        case "HAMBURGER_ACTION":
            return state = action.payload;
    
        default:
            return state;
    }
}