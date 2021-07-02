import { Descriptions } from "antd";
import React from "react";
import { configTernary } from "../../utils";
import "./ConditionsList.css";

const ConditionsList = (props) => {
  return (
    <Descriptions layout="vertical" bordered>
      <Descriptions.Item label="Condition Immunities">
        {configTernary(props.creature.condition_immunities, "", "None")}
      </Descriptions.Item>
      <Descriptions.Item label="Damage Immunities">
        {configTernary(props.creature.damage_immunities, "", "None")}
      </Descriptions.Item>
      <Descriptions.Item label="Damage Resistances">
        {configTernary(props.creature.damage_resistances, "", "None")}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default ConditionsList;
