import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Collapse, Divider, List, Row, Space, Table, Tabs, Tag, Tooltip } from "antd";
import chessboard from "../../assets/chessBoard.jpeg";
import AbilityScoreList from "../../components/AbilityScoreList/AbilityScoreList";
import ActionList from "../../components/ActionList/ActionList";
import ConditionsList from "../../components/ConditionsList/ConditionsList";
import Header from "../../components/Header/Header";
import HealthBar from "../../components/HealthBar/HealthBar";
import SkillsGrid from "../../components/SkillsGrid/SkillsGrid";
import SpellCard from "../../components/SpellCard/SpellCard";
import InitiativeControls from "./InitiativeControls/InitiativeControls";
import _ from "lodash";
import "./EncounterView.css";

const {TabPane} = Tabs;
const {Panel} = Collapse;

const EncounterView = () => {
  const selectedEncounter = useSelector((state) => state.selectedEncounter);
  console.log(selectedEncounter);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (record) => {
        return (
          <label style={{fontSize:"medium"}}>{record} <Tag color="gold" style={{fontSize:"xx-small"}}>Legendary</Tag></label>
        );
      }
    },
    {
      title: "Initiative",
      dataIndex: "initiative",
      key: "initiative",
      align: "center",
      render: (record) => {
        return (record ?
            <Tooltip title={`${record.diceRolled} + ${record.total - record.diceRolled} = ${record.total}`}>
              <span>{record.total === undefined ? record : record.total}</span>
            </Tooltip>
            : <p>0</p>
        );
      },
    },
  ];

  return (
    <div key="wrapperDiv">
      <Header image={chessboard}/>
      <div key="encounterView" className="wrapper-div">
        <Row gutter={8} className="wrapper-div">
          <Col span={17}>
            <List
              key="encounterViewList"
              dataSource={selectedEncounter.encounter.creatures}
              renderItem={(creature) => (
                <List.Item>
                  <Collapse
                    style={{width: "100%"}}
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
                        <HealthBar creature={creature}/>
                        <Tabs defaultActiveKey="abilities">
                          <TabPane tab="Abilities" key="abilities">
                            <>
                              <AbilityScoreList creature={creature}/>
                              <Divider/>
                              <Collapse ghost>
                                <Panel header="Skills" key={"skills-panel"}>
                                  <SkillsGrid creature={creature}/>
                                </Panel>
                              </Collapse>
                              <br/>
                              <ConditionsList creature={creature}/>
                              <Divider/>
                              <Collapse ghost>
                                <Panel header="Actions" key={"actions-panel"}>
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
                                  key={"special-abilities-panel"}>
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
                                  key={"legendary-abilities-panel"}>
                                  <p>{creature.legendary_desc}</p>
                                  <ActionList
                                    dataSource={creature.legendary_actions}
                                    actionType={"legendary"}
                                  />
                                </Panel>
                              </Collapse>
                            </>
                          </TabPane>
                          <TabPane tab="Spells" disabled={creature.spells.length === 0 | _.isEmpty(creature.spells)}>
                            <SpellCard creature={creature}/>
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
            <InitiativeControls/>
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
      </div>
    </div>
  );
};

export default EncounterView;
