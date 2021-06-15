import React from "react"
import {Table} from "antd";
import { Content } from "antd/lib/layout/layout";
import Header from "../../components/Header/Header";
import chessboard from "../../assets/chessBoard.jpeg"
import "./EncounterTracker.css";

const EncounterTracker = (props) => {

const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Rarity',
      dataIndex: 'rarity',
      key: 'rarity'
    }
  ]

  return (
    <div>
      <Header image={chessboard}/>
      <Content className="app-content">
        <Table  columns={columns} />
      </Content>
    </div>
  );
}

export default EncounterTracker;