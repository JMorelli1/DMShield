import React from "react";
import { Card } from "antd";
import { returnZeroIfUndefined, wrapInParens } from "../../utils";
import "./SkillsGrid.css";

const SkillsGrid = (props) => {
  return (
    <Card onClick={(record) => console.log(record.target.id)}>
      <Card.Grid className="grid-card">
        <label id="athletics">
          Athletics:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.athletics))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Acrobatics:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.acrobatics))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Sleight of Hand:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.slight_of_hand))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Stealth: {wrapInParens(returnZeroIfUndefined(props.skills.stealth))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Arcana: {wrapInParens(returnZeroIfUndefined(props.skills.arcana))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          History: {wrapInParens(returnZeroIfUndefined(props.skills.history))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Investigation:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.investigation))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Nature: {wrapInParens(returnZeroIfUndefined(props.skills.nature))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Religion: {wrapInParens(returnZeroIfUndefined(props.skills.Religion))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Animal Handling:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.animal_handling))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Insight: {wrapInParens(returnZeroIfUndefined(props.skills.insight))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Medicine: {wrapInParens(returnZeroIfUndefined(props.skills.medicine))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Perception:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.perception))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Survival: {wrapInParens(returnZeroIfUndefined(props.skills.survival))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Deception:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.deception))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Intimidation:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.intimidation))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Performance:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.performance))}
        </label>
      </Card.Grid>
      <Card.Grid className="grid-card">
        <label>
          Persuasion:{" "}
          {wrapInParens(returnZeroIfUndefined(props.skills.persuasion))}
        </label>
      </Card.Grid>
    </Card>
  );
};

export default SkillsGrid;
