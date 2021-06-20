import { actions } from "../ActionEnums"

export const initialState = {
    monsters:[],
    encounterData:[]
}

export const EncounterReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_ALL_MONSTERS:
            return {
                ...state,
                monsters: action.payload.monsters
            }
        case actions.ADD_MONSTER: 
            return {
                ...state,
                monsters: [
                    ...state.monsters,
                    action.payload.monster
                ]
            };
        case actions.ADD_ENCOUNTER:
            return {
                ...state,
                encounterData: [
                    ...state.encounterData,
                    action.payload
                ]
            }
        default:
            return state
    }
}