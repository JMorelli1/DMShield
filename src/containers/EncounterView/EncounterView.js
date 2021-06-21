import { Col, List, Row, Card, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import chessboard from "../../assets/chessBoard.jpeg";
import Header from "../../components/Header/Header";
import "./EncounterView.css";

const EncounterView = (props) => {
  const encounterState = useSelector((state) => state);
  console.log(encounterState.selectedEncounter.encounter.monsters);
  return (
    <div key="wrapperDiv">
      <Header image={chessboard} />
      <div key="encounterView" className="wrapper-div">
        <Row gutter={8}>
          <Col span={12}>
            <List
              bordered
              dataSource={encounterState.selectedEncounter.encounter.monsters}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={
                      <Space size="large">
                        <label>Monster: {item.name}</label>
                        <label>CR: {item.challenge_rating}</label>
                      </Space>
                    }
                    style={{ width: "100%" }}
                  >
                    More monster details
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EncounterView;
