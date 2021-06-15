import React, {useState} from "react"
import { Layout, Menu as AntMenu, Image} from 'antd';
import { Link } from "react-router-dom";
import chessboard from "../../assets/chessBoard.jpeg"
import "./Header.css"

const AntHeader = Layout;

const Header = () => {

    const [selectedKey, setSelectedKey] = useState("");

    const clicked = (Event) => {
        setSelectedKey(Event.key + "");
    }

    return(
        <div>
        <Image
            width={'100%'}
            style={{display:'unset'}}
            src={chessboard}
            />
        <AntHeader>
            <AntMenu theme="dark" mode="horizontal" selectedKeys={selectedKey} className="Header-menu">
                <AntMenu.Item key="1" onClick={clicked} style={{paddingTop:5, paddingBottom:5}}><Link to="/">Home</Link></AntMenu.Item>
                <AntMenu.Item key="2" onClick={clicked} style={{paddingTop:5, paddingBottom:5}}><Link to="/encounters">Encounter Tracker</Link></AntMenu.Item>
            </AntMenu>
        </AntHeader>
        </div>
    );
}
export default Header;