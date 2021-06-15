import React from "react"
import {Layout, Table} from "antd";
import { Content } from "antd/lib/layout/layout";
import Header from "../../components/Header/Header";
import "./Home.css";

const Home = (props) => {

  return (
    <div className="Encounter-content">
    <Header />
    <Content className="App-content">
      <p>Oooohhh all homey</p>
    </Content>
    </div>
  );
}

export default Home;