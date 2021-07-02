import { Collapse, Descriptions } from "antd";
import React from "react";
import { configTernary, wrapInParens } from "../../utils";
import "./AbilityScoreList.css";

const { Panel } = Collapse;

const AbilityScoreList = ({ creature }) => {
  return (
    <div>
      <Collapse ghost defaultActiveKey="ability_scores">
        <Panel header={"Ability Scores"} key="ability_scores">
          <Descriptions
            size="small"
            column={5}
            layout="vertical"
            bordered
            style={{ margin: "0", padding: "0" }}
          >
            <Descriptions.Item label="Strength">
              {creature.strength}
              {"  "}
              {wrapInParens(creature.abilityScoreBonus.strength)}
            </Descriptions.Item>
            <Descriptions.Item label="Dexterity">
              {creature.dexterity}
              {"  "}
              {wrapInParens(creature.abilityScoreBonus.dexterity)}
            </Descriptions.Item>
            <Descriptions.Item label="Intelligence">
              {creature.intelligence}
              {"  "}
              {wrapInParens(creature.abilityScoreBonus.intelligence)}
            </Descriptions.Item>
            <Descriptions.Item label="Wisdom">
              {creature.wisdom}
              {"  "}
              {wrapInParens(creature.abilityScoreBonus.wisdom)}
            </Descriptions.Item>
            <Descriptions.Item label="Charisma">
              {creature.charisma}
              {"  "}
              {wrapInParens(creature.abilityScoreBonus.charisma)}
            </Descriptions.Item>
          </Descriptions>
        </Panel>
        <Panel header="Saves">
          <Descriptions size="small" bordered column={5} layout="vertical">
            <Descriptions.Item label="Strength">
              {wrapInParens(configTernary(creature.strength_save, null, 0))}
            </Descriptions.Item>
            <Descriptions.Item label="Dexterity">
              {wrapInParens(configTernary(creature.dexterity_save, null, 0))}
            </Descriptions.Item>
            <Descriptions.Item label="Intelligence">
              {wrapInParens(configTernary(creature.intelligence_save, null, 0))}
            </Descriptions.Item>
            <Descriptions.Item label="Wisdom">
              {wrapInParens(configTernary(creature.wisdom_save, null, 0))}
            </Descriptions.Item>
            <Descriptions.Item label="Charisma">
              {wrapInParens(configTernary(creature.charisma_save, null, 0))}
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      </Collapse>
    </div>
  );
  // }
};

export default AbilityScoreList;
