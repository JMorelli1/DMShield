import {actions} from "../ActionEnums"

export const addMonster = (newMonster) => {
    return {
        type: actions.ADD_MONSTER,
        payload: {
            newMonster
        }
    }
}

export const addAllMonsters = (monsters) => {
    return {
        type: actions.ADD_ALL_MONSTERS,
        payload: {
            monsters
        }
    }
}

export const addNewEncounter = (name, challenge_rating, encounter) => {
    return {
        type: actions.ADD_ENCOUNTER,
        payload: {
            name,
            challenge_rating,
            encounter
        }
    }
}