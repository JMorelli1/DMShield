import { Button, Col, Descriptions, Input, List, Progress, Row } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEncounterCreatures } from "../../redux/actions/EncounterActions";
import "./HealthBar.css";

const HealthBar = ({ creature }) => {
  const encounterCreatures = useSelector(
    (state) => state.selectedEncounter.encounter.creatures
  );
  const [value, setValue] = useState(0);
  const [percentage, setPercentage] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setPercentage((creature.current_hp / creature.hit_points) * 100);
  }, [encounterCreatures, creature]);

  const handlePercentage = (event) => {
    if (event.currentTarget.id === "damageBtn") {
      updateCreatures(creature.current_hp - parseInt(value));
    } else if (event.currentTarget.id === "healBtn") {
      if (creature.current_hp + parseInt(value) >= creature.hit_points) {
        updateCreatures(creature.hit_points);
      } else {
        updateCreatures(creature.current_hp + parseInt(value));
      }
    }
  };

  const updateCreatures = (newHealth) => {
    let updatedCreatures = encounterCreatures.map((cr) => {
      if (creature.slug === cr.slug) {
        return {
          ...cr,
          current_hp: newHealth,
        };
      }
      return cr;
    });
    dispatch(setSelectedEncounterCreatures(updatedCreatures));
  };

  let speed = _.toPairs(creature.speed);
  return (
    <Row>
      <Col span={8}>
        <Descriptions size="small" layout="horizontal" column={1}>
          <Descriptions.Item>
            <label>Creature Type: {creature.type}</label>
          </Descriptions.Item>
          <Descriptions.Item>
            <label>Size: {creature.size}</label>
          </Descriptions.Item>
          <Descriptions.Item>
            <label>Hit Dice: {creature.hit_dice}</label>
          </Descriptions.Item>
          <Descriptions.Item>
            <label>Walk: {creature.speed.walk}</label>
          </Descriptions.Item>
          <Descriptions.Item>
            <label>CR: {creature.challenge_rating}</label>
          </Descriptions.Item>
        </Descriptions>
      </Col>

      <Col span={4}>
        <h1>Health</h1>
        <Progress
          type="dashboard"
          percent={percentage}
          status="exception"
          format={(percent) => `${creature.current_hp}/${creature.hit_points}`}
        />
      </Col>
      <Col span={4}>
        <h1>Speed</h1>
        <List
          dataSource={speed}
          renderItem={(item) => (
            <List.Item>
              <label>{item[0]}: </label> {item[1]}
            </List.Item>
          )}
        />
      </Col>
      <Col span={8}>
        <div className="health-bar-div">
          <div className="health-bar-input">
            <Input
              onChange={(event) => setValue(event.target.value)}
              type="number"
            />
          </div>
          <div className="health-bar-buttons">
            <Button
              onClick={(event) => handlePercentage(event)}
              id="damageBtn"
              className="damage-button"
            >
              Damage
            </Button>
            <Button
              id="healBtn"
              onClick={(event) => handlePercentage(event)}
              className="heal-button"
            >
              Heal
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default HealthBar;
