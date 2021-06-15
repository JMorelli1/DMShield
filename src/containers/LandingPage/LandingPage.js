import React from "react"
import {Layout, Table} from "antd";
import { Content } from "antd/lib/layout/layout";
import Header from "../../components/Header/Header";
import "./LandingPage.css";
// import {getAllMagicItems} from "../services/Open5eService";s

const LandingPage = (props) => {

  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadData = async () => {
  //     await getAllMagicItems().then((data) => {
  //       if (data) {
  //         setData(data);
  //         setLoading(false);
  //       }
  //     });
  //   };
  //   loadData();
  // },[])
  // console.log(data)

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
    <div className="Encounter-content">
    <Header />
    <Content className="App-content">
      <Table  columns={columns} />
    </Content>
    </div>
  );
}

export default LandingPage;