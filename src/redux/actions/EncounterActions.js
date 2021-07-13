import { actions } from "../ActionEnums";

export const addMonster = (newMonster) => {
  return {
    type: actions.ADD_MONSTER,
    payload: {
      newMonster,
    },
  };
};

export const addAllMonsters = (monsters) => {
  return {
    type: actions.ADD_ALL_MONSTERS,
    payload: {
      monsters,
    },
  };
};

export const addNewEncounter = (name, challenge_rating, encounter) => {
  return {
    type: actions.ADD_ENCOUNTER,
    payload: {
      name,
      challenge_rating,
      encounter,
    },
  };
};

export const setSelectedEncounterCreatures = (creatures) => {
  return {
    type: actions.SET_SELECTED_ENCOUNTER_CREATURES,
    payload: {
      creatures,
    },
  };
};

export const setSelectedEncounter = (encounter) => {
  return {
    type: actions.SET_SELECTED_ENCOUNTER,
    payload: {
      encounter,
    },
  };
};

export const setGroupInitiative = (shouldGroup) => {
  return {
    type: actions.SET_GROUP_INITIATIVE_SELECTOR,
    payload: {
      shouldGroup
    }
  }
}
