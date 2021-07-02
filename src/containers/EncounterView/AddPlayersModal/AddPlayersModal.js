import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEncounterCreatures } from "../../../redux/actions/EncounterActions";
import "./AddPlayersModal.css";

const AddPlayersModal = ({ isShown, setIsShown }) => {
  const currentCreatures = useSelector(
    (state) => state.selectedEncounter.encounter.creatures
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    let players = form.getFieldValue("players");
    let newList = [...currentCreatures, ...players];
    newList.sort((a, b) => (a.initiative > b.initiative ? -1 : 1));
    dispatch(setSelectedEncounterCreatures(newList));
    form.resetFields();
    setIsShown(!isShown);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsShown(!isShown);
  };

  return (
    <Modal
      title="Add Players"
      visible={isShown}
      onOk={handleOk}
      onCancel={handleCancel}
      name="addPlayersModal"
    >
      <Form
        name="addPlayersForm"
        form={form}
        onFinish={(values) => console.log(values)}
      >
        <Form.List name="players">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...field }) => (
                <Form.Item>
                  <Space key={key} style={{ display: "flex" }} align="baseline">
                    <Form.Item
                      {...field}
                      name={[name, "name"]}
                      fieldKey={[fieldKey, "name"]}
                      style={{ width: "100%", margin: 0, padding: 0 }}
                    >
                      <Input placeholder="Player" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[name, "initiative"]}
                      fieldKey={(fieldKey, "initiative")}
                      style={{ width: "100%", margin: 0, padding: 0 }}
                    >
                      <Input placeholder="Initiative" />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(name)}
                      />
                    ) : null}
                  </Space>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "60%" }}
                  icon={<PlusOutlined />}
                >
                  Add Field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddPlayersModal;
