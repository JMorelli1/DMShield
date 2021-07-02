import { actions } from "../ActionEnums";

const initialState = {
  monsters: [],
  encounterData: [],
  selectedEncounter: {},
};

export const EncounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ALL_MONSTERS:
      return {
        ...state,
        monsters: action.payload.monsters,
      };
    case actions.ADD_MONSTER:
      return {
        ...state,
        monsters: [...state.monsters, action.payload.monster],
      };
    case actions.ADD_ENCOUNTER:
      return {
        ...state,
        encounterData: [...state.encounterData, action.payload],
      };
    case actions.SET_SELECTED_ENCOUNTER_CREATURES:
      return {
        ...state,
        selectedEncounter: {
          ...state.selectedEncounter,
          encounter: {
            ...state.selectedEncounter.encounter,
            creatures: [...action.payload.creatures],
          },
        },
      };
    case actions.SET_SELECTED_ENCOUNTER:
      return {
        ...state,
        selectedEncounter: action.payload.encounter,
      };
    default:
      return state;
  }
};
