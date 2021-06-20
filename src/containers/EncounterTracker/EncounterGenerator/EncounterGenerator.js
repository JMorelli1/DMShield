import {
  Button,
  Col,
  Input,
  InputNumber,
  List,
  Row,
  Space,
  Table,
  Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllMonsters,
  addNewEncounter,
} from "../../../redux/actions/EncounterActions";
import { getData } from "../../../services/Open5eService";
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

  useEffect(() => {
    const loadData = async () => {
      await getData(process.env.REACT_APP_MONSTERS_PATH, 10).then((data) => {
        if (data) {
          dispatch(addAllMonsters(data.results));
          setLoading(false);
        }
      });
    };
    loadData();
  }, []);

  const handleCRTotal = (slug, type, cr) => {
    if (type === "up") {
      setEncounterGenerator(
        encounterGenerator.map((elem) =>
          elem.slug === slug
            ? Object.assign({}, elem, { count: elem.count + 1 })
            : elem
        )
      );
      setChallengeTotal(challengeTotal + parseFloat(cr));
    } else if (type === "down") {
      setEncounterGenerator(
        encounterGenerator.map((elem) =>
          elem.slug === slug
            ? Object.assign({}, elem, { count: elem.count - 1 })
            : elem
        )
      );
      setChallengeTotal(challengeTotal - parseFloat(cr));
    }
  };

  const handleAddMonster = (record) => {
    setEncounterGenerator([
      ...encounterGenerator,
      {
        ...record,
        count: 1,
      },
    ]);
    console.log(encounterGenerator);
    setChallengeTotal(challengeTotal + parseFloat(record.challenge_rating, 10));
  };

  const handleGeneration = (btnName) => {
    if (btnName === "generate") {
      let encounter = {
        monsters: [...encounterGenerator],
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

  const onSearch = (value) => {
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
      render: (record) => (
        <Button
          type="ghost"
          onClick={() => handleAddMonster(record)}
          icon={<PlusOutlined />}
        ></Button>
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
      <div className="encounter-main" key="encounterMain">
        <Row gutter={8}>
          <Col span={12}>
            <Form style={{ margin: "2%" }}>
              <Form.Item label="Encounter Name: ">
                <Input
                  style={{ width: "25vw" }}
                  onChange={(value) => setEncounterName(value.target.value)}
                />
              </Form.Item>
            </Form>
            <List
              className="encounter-list"
              key="encounterList"
              bordered
              dataSource={encounterGenerator}
              renderItem={(item) => (
                <List.Item
                  key={item.slug}
                  actions={[
                    <div>
                      <label key="totalLabel">Total: </label>
                      <InputNumber
                        key="monsterInputNumber"
                        min={1}
                        onStep={(event, info) => {
                          handleCRTotal(
                            item.slug,
                            info.type,
                            item.challenge_rating
                          );
                        }}
                        defaultValue={1}
                      />
                    </div>,
                    <Button
                      key="deleteEncounter"
                      onClick={() => handleDelete(item.slug)}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <Space>
                    <label>Monster: {item.name}</label>
                    <label>CR: {item.challenge_rating}</label>
                  </Space>
                </List.Item>
              )}
              footer={
                <Space size="middle">
                  <label style={{ float: "left" }}>
                    Total Challenge Rating: {challengeTotal}
                  </label>
                </Space>
              }
            />
            <Space style={{ float: "right", margin: "1%" }}>
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
              onSearch={onSearch}
              style={{ marginBottom: "1%" }}
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
