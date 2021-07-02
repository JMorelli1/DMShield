import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  List,
  Row,
  Space,
  Switch,
  Table,
  Tooltip,
  Tabs,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chessboard from "../../assets/chessBoard.jpeg";
import AbilityScoreList from "../../components/AbilityScoreList/AbilityScoreList";
import ActionList from "../../components/ActionList/ActionList";
import ConditionsList from "../../components/ConditionsList/ConditionsList";
import Header from "../../components/Header/Header";
import HealthBar from "../../components/HealthBar/HealthBar";
import SkillsGrid from "../../components/SkillsGrid/SkillsGrid";
import SpellCard from "../../components/SpellCard/SpellCard";
import { setSelectedEncounter } from "../../redux/actions/EncounterActions";
import { rollDice } from "../../services/MathEqService";
import AddPlayersModal from "./AddPlayersModal/AddPlayersModal";
import "./EncounterView.css";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const EncounterView = (props) => {
  const selectedEncounter = useSelector((state) => state.selectedEncounter);
  const [showModal, setShowModal] = useState(false);
  const [groupedInitiative, setGroupedInitiative] = useState(true);
  const dispatch = useDispatch();
  console.log(selectedEncounter);

  const handleRollInitiative = () => {
    let initEncounter = [];
    selectedEncounter.encounter.creatures.forEach((creature) => {
      if (creature.count === 1 || groupedInitiative) {
        let { value, diceRolled } = rollDice(
          creature.abilityScoreBonus.dexterity
        );
        initEncounter = [
          ...initEncounter,
          {
            ...creature,
            initiative: value,
            diceRolled,
          },
        ];
      } else {
        for (let i = 1; i <= creature.count; i++) {
          let { value, diceRolled } = rollDice(
            creature.abilityScoreBonus.dexterity
          );
          initEncounter = [
            ...initEncounter,
            {
              ...creature,
              name: creature.name + "-" + i,
              slug: creature.slug + "-" + i,
              count: 1,
              initiative: value,
              diceRolled: diceRolled,
            },
          ];
        }
      }
    });
    initEncounter.sort((a, b) => (a.initiative > b.initiative ? -1 : 1));
    dispatch(
      setSelectedEncounter({
        ...selectedEncounter,
        encounter: {
          ...selectedEncounter.encounter,
          creatures: [...initEncounter],
        },
      })
    );
  };

  const handleNextTurn = () => {
    let temp = [...selectedEncounter.encounter.creatures];
    let prevTurn = temp.splice(0, 1);
    temp.push(prevTurn[0]);
    dispatch(
      setSelectedEncounter({
        ...selectedEncounter,
        encounter: {
          ...selectedEncounter.encounter,
          creatures: [...temp],
        },
      })
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Initiative",
      dataIndex: "initiative",
      key: "initiative",
      align: "center",
      render: (record, rowIndex) => {
        return (
          <Tooltip title={record}>
            <span>{record}</span>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div key="wrapperDiv">
      <Header image={chessboard} />
      <div key="encounterView" className="wrapper-div">
        <Row gutter={8} className="wrapper-div">
          <Col span={17}>
            <List
              key="encounterViewList"
              dataSource={selectedEncounter.encounter.creatures}
              renderItem={(creature) => (
                <List.Item>
                  <Collapse
                    style={{ width: "100%" }}
                    {...(selectedEncounter.encounter.creatures[0].slug !==
                    undefined
                      ? {
                          activeKey:
                            selectedEncounter.encounter.creatures[0].slug,
                        }
                      : null)}
                  >
                    <Panel
                      header={creature.name}
                      key={creature.slug}
                      collapsible={
                        creature.slug === undefined ? "disabled" : "header"
                      }
                    >
                      <Card
                        title={creature.name}
                        extra={
                          <Space size="large">
                            <label
                              style={{
                                fontWeight: "bolder",
                                fontSize: "15px",
                              }}
                            >
                              Armor Class: {creature.armor_class}
                            </label>
                          </Space>
                        }
                        className="ecounter-view-list"
                      >
                        <HealthBar creature={creature} />
                        <Divider />
                        <Tabs defaultActiveKey="abilities">
                          <TabPane tab="Abilities" key="abilities">
                            <>
                              <AbilityScoreList creature={creature} />
                              <Divider />
                              <Collapse ghost>
                                <Panel header="Skills">
                                  <SkillsGrid skills={creature.skills} />
                                </Panel>
                              </Collapse>
                              <br />
                              <ConditionsList creature={creature} />
                              <Divider />
                              <Collapse ghost>
                                <Panel header="Actions">
                                  <ActionList
                                    dataSource={creature.actions}
                                    actionType={"ordinary"}
                                  />
                                </Panel>
                                <Panel
                                  header="Special Actions"
                                  collapsible={
                                    creature.special_abilities === ""
                                      ? "disabled"
                                      : "enabled"
                                  }
                                >
                                  <ActionList
                                    dataSource={creature.special_abilities}
                                    actionType={"special"}
                                  />
                                </Panel>
                                <Panel
                                  header="Legendary Actions"
                                  collapsible={
                                    creature.legendary_actions === ""
                                      ? "disabled"
                                      : "enabled"
                                  }
                                >
                                  <p>{creature.legendary_desc}</p>
                                  <ActionList
                                    dataSource={creature.legendary_actions}
                                    actionType={"legendary"}
                                  />
                                </Panel>
                              </Collapse>
                            </>
                          </TabPane>
                          <TabPane tab="Spells">
                            <SpellCard creature={creature} />
                          </TabPane>
                        </Tabs>
                      </Card>
                    </Panel>
                  </Collapse>
                </List.Item>
              )}
            />
          </Col>
          <Col span={7}>
            <Space style={{ marginBottom: "1%" }}>
              <Space direction="vertical">
                <Button onClick={handleRollInitiative}>Roll Initiative</Button>
                <Button onClick={handleNextTurn}>Next Turn</Button>
              </Space>
              <Space direction="vertical">
                <label>Group Initiative:</label>
                <Switch
                  defaultChecked
                  onChange={() => setGroupedInitiative(!groupedInitiative)}
                />

                <Button type="primary" onClick={() => setShowModal(!showModal)}>
                  Add Players
                </Button>
              </Space>
            </Space>
            <Table
              rowClassName={(record, index) =>
                index === 0 ? "table-row-light" : ""
              }
              dataSource={selectedEncounter.encounter.creatures}
              pagination={false}
              columns={columns}
            />
          </Col>
        </Row>
        <AddPlayersModal isShown={showModal} setIsShown={setShowModal} />
      </div>
    </div>
  );
};

export default EncounterView;
