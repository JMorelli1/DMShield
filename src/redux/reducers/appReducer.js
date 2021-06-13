import { ACTIONS } from "../ActionEnums";

const initialState = {
    prop1: "Hello",
    prop2: "There"
}

export const addUser = () => {
    return {
        type: ACTIONS.ADD
    }
}

// TODO: Establish appReducer filters

export default function appReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.ADD:
            return {
                ...state,
                prop3: "Try me"
            }
        case ACTIONS.REMOVE:
            return {
                ...state,
                prop3: ""
            }
        case ACTIONS.UPDATE:
            break;
        default:
            return state;
    }
}