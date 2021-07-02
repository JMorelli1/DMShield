import { EncounterReducer } from "./EncounterReducer";
import { compose } from "redux";

export const rootReducer = compose(EncounterReducer);