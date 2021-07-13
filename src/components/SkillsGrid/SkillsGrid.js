import React from "react";
import { Card } from "antd";
import "./SkillsGrid.css";
import { configTernary, wrapInParens } from "../../utils";

const SkillsGrid = ({creature}) => {
  return (
    <Card>
      <Card.Grid className="grid-card">
        <label id="athletics">
          Athletics:{" "}
          {wrapInParens(configTernary(creature.skills.athletics, undefined, creature.abilityScoreBonus.strength))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Acrobatics:{" "}
          {wrapInParens(configTernary(creature.skills.acrobatics, undefined, creature.abilityScoreBonus.dexterity))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Sleight of Hand:{" "}
          {wrapInParens(configTernary(creature.skills.slight_of_hand, undefined, creature.abilityScoreBonus.dexterity))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Stealth: {wrapInParens(configTernary(creature.skills.stealth, undefined, creature.abilityScoreBonus.dexterity))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Arcana: {wrapInParens(configTernary(creature.skills.arcana, undefined, creature.abilityScoreBonus.intelligence))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          History: {wrapInParens(configTernary(creature.skills.history, undefined, creature.abilityScoreBonus.intelligence))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Investigation:{" "}
          {wrapInParens(configTernary(creature.skills.investigation, undefined, creature.abilityScoreBonus.intelligence))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Nature: {wrapInParens(configTernary(creature.skills.nature, undefined, creature.abilityScoreBonus.intelligence))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Religion: {wrapInParens(configTernary(creature.skills.religion, undefined, creature.abilityScoreBonus.intelligence))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Animal Handling:{" "}
          {wrapInParens(configTernary(creature.skills.animal_handling, undefined, creature.abilityScoreBonus.wisdom))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Insight: {wrapInParens(configTernary(creature.skills.insight, undefined, creature.abilityScoreBonus.wisdom))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Medicine: {wrapInParens(configTernary(creature.skills.medicine, undefined, creature.abilityScoreBonus.wisdom))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Perception:{" "}
          {wrapInParens(configTernary(creature.skills.perception, undefined, creature.abilityScoreBonus.wisdom))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Survival: {wrapInParens(configTernary(creature.skills.survival, undefined, creature.abilityScoreBonus.wisdom))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Deception:{" "}
          {wrapInParens(configTernary(creature.skills.deception, undefined, creature.abilityScoreBonus.charisma))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Intimidation:{" "}
          {wrapInParens(configTernary(creature.skills.intimidation, undefined, creature.abilityScoreBonus.charisma))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Performance:{" "}
          {wrapInParens(configTernary(creature.skills.performance, undefined, creature.abilityScoreBonus.charisma))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Persuasion:{" "}
          {wrapInParens(configTernary(creature.skills.persuasion, undefined, creature.abilityScoreBonus.charisma))}
        </label>
      </Card.Grid>
    </Card>
  );
};

export default SkillsGrid;
