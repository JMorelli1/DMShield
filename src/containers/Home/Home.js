import React from "react"
import { Content } from "antd/lib/layout/layout";
import Header from "../../components/Header/Header";
import dice from "../../assets/dice.jpeg"
import "./Home.css";

const Home = () => {

  return (
    <div>
      <Header image={dice}/>
      <Content>
        <div className="home-body">
          <p>Oooohhh all homey</p>
          <span>Well.....I'm working on it</span>
        </div>
      </Content>
    </div>
  );
}

export default Home;