import { Button, Col, Divider, Row, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chessboard from "../../assets/chessBoard.jpeg";
import Header from "../../components/Header/Header";
import EncounterGenerator from "./EncounterGenerator/EncounterGenerator";
import { setSelectedEncounter } from "../../redux/actions/EncounterActions";
import "./EncounterTracker.css";

const EncounterTracker = (props) => {
  const encounterState = useSelector((state) => state);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const handleView = (record) => {
    dispatch(setSelectedEncounter(record));
    props.history.push("/encounterView");
  };

  const encounterColumns = [
    {
      title: "",
      render: (record) => (
        <Button type="ghost" onClick={() => handleView(record)}>
          View
        </Button>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Challenge Rating",
      dataIndex: "challenge_rating",
      key: "challenge_rating",
    },
  ];

  return (
    <div key="wrapperDiv">
      <Header image={chessboard} />
      <div className="wrapper-div" key="encounterMain" hidden={clicked}>
        <Row>
          <Button type="primary" onClick={() => setClicked(!clicked)}>
            Generate Encounter
          </Button>
        </Row>
        <Divider />
        <Row gutter={8}>
          <Col span={24}>
            <Table
              key="encounterTable"
              columns={encounterColumns}
              dataSource={encounterState.encounterData}
              onRow={(record, row) => {
                return {
                  onDoubleClick: () => {
                    dispatch(setSelectedEncounter(record));
                    props.history.push("/encounterView");
                  },
                };
              }}
            />
          </Col>
        </Row>
      </div>
      <div hidden={!clicked}>
        <EncounterGenerator setClicked={setClicked} clicked={clicked} />
      </div>
    </div>
  );
};

export default EncounterTracker;
