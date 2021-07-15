import React, { useEffect, useState } from "react";
import {
  Button, Col, Input, InputNumber, List, Row, Space, Table, Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  parseSpellCastingText,
  parseInnateSpellCastingText,
  parseCR,
} from "../../../helper/Parser.js";
import {
  addAllMonsters,
  addNewEncounter,
} from "../../../redux/actions/EncounterActions";
import { getData } from "../../../services/Open5eService";
import { getAbilityScoreBonus } from "../../../services/MathEqService";
import "./EncounterGenerator.css";

const { Search } = Input;

const EncounterGenerator = (props) => {
  const [encounterGenerator, setEncounterGenerator] = useState([]);
  const [searchedTable, setSearchedTable] = useState([]);
  const [encounterName, setEncounterName] = useState("");
  const [challengeTotal, setChallengeTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const encounterState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(
    () => {
      const loadData = async () => {
        await getData(process.env.REACT_APP_MONSTERS_PATH, 50).then(
          (data) => {
            if (data) {
              dispatch(addAllMonsters(data.results));
              setLoading(false);
            }
          }
        );
      };
      loadData();
    },
    [dispatch],
    () => {
    }
  );

  const handleCRTotal = (slug, type, cr) => {
    if (type === "up") {
      setEncounterGenerator(
        encounterGenerator.map((elem) =>
          elem.slug === slug
            ? Object.assign({}, elem, {count: elem.count + 1})
            : elem
        )
      );
      setChallengeTotal(challengeTotal + parseFloat(cr));
    } else if (type === "down") {
      setEncounterGenerator(
        encounterGenerator.map((elem) =>
          elem.slug === slug
            ? Object.assign({}, elem, {count: elem.count - 1})
            : elem
        )
      );
      setChallengeTotal(challengeTotal - parseFloat(cr));
    }
  };

  const handleAddMonster = (monster) => {
    let isInEncounter = false;
    let parsedCR = parseCR(monster.challenge_rating);
    let spells = {};
    let updatedEncounter = encounterGenerator.map((m) => {
      if (m.slug === monster.slug) {
        isInEncounter = true;
        return {
          ...m,
          count: m.count + 1,
        };
      }
      return m;
    });
    if (isInEncounter) {
      setEncounterGenerator([...updatedEncounter]);
    } else {
      if (monster.special_abilities.length >= 1) {
        monster.special_abilities.forEach((specialA) => {
          if (specialA.name === "Innate Spellcasting") {
            spells = {
              innate_spell_caster: parseInnateSpellCastingText(specialA.desc),
            };
          } else if (specialA.name === "Spellcasting") {
            spells = {
              ...spells,
              spell_caster: parseSpellCastingText(specialA.desc),
            };
          }
        });
      }
      setEncounterGenerator([
        ...encounterGenerator,
        {
          ...monster,
          count: 1,
          current_hp: monster.hit_points,
          challenge_rating: parsedCR,
          spells,
          abilityScoreBonus: {
            strength: getAbilityScoreBonus(monster.strength),
            dexterity: getAbilityScoreBonus(monster.dexterity),
            constitution: getAbilityScoreBonus(monster.constitution),
            intelligence: getAbilityScoreBonus(monster.intelligence),
            wisdom: getAbilityScoreBonus(monster.wisdom),
            charisma: getAbilityScoreBonus(monster.charisma),
          },
          active_statuses: [],
        },
      ]);
    }
    setChallengeTotal(challengeTotal + parsedCR);
  };

  const handleGeneration = (btnName) => {
    if (btnName === "generate") {
      let encounter = {
        creatures: [...encounterGenerator],
      };
      dispatch(addNewEncounter(encounterName, challengeTotal, encounter));
    }
    setEncounterGenerator([]);
    setChallengeTotal(0);
    setEncounterName("");
    props.setClicked(!props.clicked);
  };

  const handleDelete = (slug) => {
    setChallengeTotal();
    encounterGenerator.forEach((monster) => {
      if (monster.slug === slug) {
        setChallengeTotal(
          challengeTotal - monster.count * monster.challenge_rating
        );
      }
    });
    setEncounterGenerator(
      encounterGenerator.filter((monster) => monster.slug !== slug)
    );
  };

  const handleSearch = (value) => {
    console.log(value);
    setSearchedTable(
      encounterState.monsters.filter((monster) =>
        monster.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    console.log(searchedTable);
  };

  const monsterColumns = [
    {
      title: "",
      key: "btnAddMonster",
      render: (record) => (
        <Button
          type="ghost"
          onClick={() => handleAddMonster(record)}
          icon={<PlusOutlined/>}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "CR",
      dataIndex: "challenge_rating",
      key: "challenge_rating",
    },
  ];

  return (
    <div key="wrapperDiv">
      <div className="wrapper-div" key="encounterMain">
        <Row gutter={8}>
          <Col span={12}>
            <Form style={{margin: "2%"}}>
              <Form.Item label="Encounter Name: ">
                <Input
                  style={{width: "25vw"}}
                  onChange={(event) => setEncounterName(event.target.value)}
                />
              </Form.Item>
            </Form>
            <List
              className="encounter-list"
              key="encounterList"
              bordered
              dataSource={encounterGenerator}
              renderItem={(monster) => (
                <List.Item
                  key={monster.slug}
                  actions={[
                    <div>
                      <label key="totalLabel">Total: </label>
                      <InputNumber
                        key="monsterInputNumber"
                        min={1}
                        value={monster.count}
                        onStep={(event, info) => {
                          handleCRTotal(
                            monster.slug,
                            info.type,
                            monster.challenge_rating
                          );
                        }}
                      />
                    </div>,
                    <Button
                      key="deleteEncounter"
                      onClick={() => handleDelete(monster.slug)}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <Space>
                    <label>Monster: {monster.name}</label>
                    <label>CR: {monster.challenge_rating}</label>
                  </Space>
                </List.Item>
              )}
              footer={
                <Space size="middle">
                  <label style={{float: "left"}}>
                    Total Challenge Rating: {challengeTotal}
                  </label>
                </Space>
              }
            />
            <Space style={{float: "right", margin: "1%"}}>
              <Button
                className="generate-button"
                id="genButton"
                type="primary"
                value={"genEncounter"}
                onClick={() => handleGeneration("generate")}
              >
                Generate Encounter
              </Button>
              <Button
                className="cancel-button"
                id="cancelButton"
                danger={true}
                onClick={() => handleGeneration("cancel")}
              >
                Cancel
              </Button>
            </Space>
          </Col>
          <Col span={12}>
            <Search
              placeholder="Search monsters"
              onSearch={handleSearch}
              style={{marginBottom: "1%"}}
            />
            <Table
              key="monsterTable"
              loading={loading}
              columns={monsterColumns}
              dataSource={
                searchedTable.length === 0
                  ? encounterState.monsters
                  : searchedTable
              }
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EncounterGenerator;
