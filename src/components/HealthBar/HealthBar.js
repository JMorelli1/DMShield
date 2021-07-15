import React, { useEffect, useState } from "react";
import {
  Badge, Button, Col, Descriptions, Divider, Input, List, Popover, Progress, Row, Select, Space, Tooltip
} from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEncounterCreatures } from "../../redux/actions/EncounterActions";
import { addStatusesToLocal, getStatusesInLocal } from "../../services/Storage";
import { getStatuses } from "../../services/Open5eService";
import _ from "lodash";
import "./HealthBar.css";

const {Option} = Select;

const HealthBar = ({creature}) => {
  const encounterCreatures = useSelector(
    (state) => state.selectedEncounter.encounter.creatures
  );
  const [value, setValue] = useState(0);
  const [percentage, setPercentage] = useState();
  const [statuses, setStatuses] = useState({})
  const dispatch = useDispatch();
  let speed = _.toPairs(creature.speed);

  useEffect(() => {
    setPercentage((creature.current_hp / creature.hit_points) * 100);
    const loadStatuses = async () => {
      getStatuses().then(data => {
        if (data) {
          addStatusesToLocal(data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
    const localStorageStatuses = getStatusesInLocal();
    if (!localStorageStatuses) {
      loadStatuses();
    }
    if (_.isEmpty(statuses)) {
      setStatuses(localStorageStatuses)
    }
  }, [encounterCreatures, creature, statuses]);

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

  const addStatusToCreature = (value) => {
    console.log(value)
    let updatedCreatures = encounterCreatures.map((cr) => {
      if (creature.slug === cr.slug) {
        let statusToAdd = statuses.results[value]
        statuses.results.splice(value, 1);
        setStatuses({
          ...statuses,
          results: statuses.results
        })
        return {
          ...cr,
          active_statuses: [
            ...cr.active_statuses,
            statusToAdd
          ],
        };
      }
      return cr;
    });
    // setStatuses()
    dispatch(setSelectedEncounterCreatures(updatedCreatures));
  }

  const removeStatus = (removalStatus) => {
    console.log(removalStatus)
    let updatedCreatures = encounterCreatures.map((cr) => {
      if (creature.slug === cr.slug) {
        setStatuses(
          {
            ...statuses,
            results: [
              ...statuses.results,
              removalStatus
            ].sort((a, b) => a.slug > b.slug ? 1 : -1),
          }
        );
        return {
          ...cr,
          active_statuses: cr.active_statuses.filter(status => status.slug !== removalStatus.slug)
        };
      }
      return cr;
    });
    dispatch(setSelectedEncounterCreatures(updatedCreatures));
  }

  return (
    <>
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
              <label>CR: {creature.challenge_rating}</label>
            </Descriptions.Item>
            <Descriptions.Item>
              <Popover content={
                <List
                  dataSource={speed}
                  renderItem={(item) => (
                    <List.Item>
                      <label className={"speed-label"}>{item[0]}: </label> {item[1]}
                    </List.Item>
                  )}
                />
              } placement={"right"}>
                <label>Speed <InfoCircleOutlined/></label>
              </Popover>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={8}>
          <h1>Health</h1>
          <Progress
            type="dashboard"
            percent={percentage}
            status="exception"
            format={(percent) => `${creature.current_hp}/${creature.hit_points}`}
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
            <Select className={"add-status-bar"} placeholder={"Add Status"} onChange={addStatusToCreature}
                    value={"Add Status"}>
              {statuses.results !== undefined
                ? statuses.results.map((status, index) => {
                  return (
                    <Option value={index}>
                      {status.name}
                    </Option>
                  )
                })
                : null}
            </Select>
          </div>
        </Col>
      </Row>
      {creature.active_statuses.length > 0
        ? <div className={"health-bar-div"}>
          <Divider/>
          <h2>Active Statuses</h2>
          <Space>
            {creature.active_statuses.map(status => {
              return (
                <Tooltip title={status.desc} placement={"right"}>
                  <div className={"status-buttons"} key={status.slug}>
                    <Badge status={"processing"} text={
                      <Button className={"remove-status-btn"} onClick={() => removeStatus(status)}>
                        {status.name}
                      </Button>}/>
                  </div>
                </Tooltip>
              );
            })}
          </Space>
        </div>
        : null}
    </>
  );
};
export default HealthBar;
