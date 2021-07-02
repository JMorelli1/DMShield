import { Collapse, List } from "antd";
import React from "react";
import "./ActionList.css";

const { Panel } = Collapse;

const ActionList = (props) => {
  return (
    <List
      dataSource={props.dataSource}
      renderItem={(action) => (
        <List.Item key={props.dataSource.slug}>
          <Collapse className="action-list-collapse">
            <Panel header={action.name} className={`${props.actionType}-title`}>
              <div className={`${props.actionType}-box`}>{action.desc}</div>
            </Panel>
          </Collapse>
        </List.Item>
      )}
    />
  );
};

export default ActionList;
