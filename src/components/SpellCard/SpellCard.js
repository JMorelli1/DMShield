import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Modal, Spin, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { getSpell } from "../../services/Open5eService";
// import { useDispatch, useSelector } from "react-redux";
import "./SpellCard.css";

const SpellCard = ({ creature }) => {
  // const currentCreatures = useSelector(
  //   (state) => state.selectedEncounter.encounter.creatures
  // );
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [innateSpells, setInnateSpells] = useState({});
  const [showInnateSpells, setShowInnateSpells] = useState(false);
  const [spells, setSpells] = useState({});
  const [showSpells, setShowSpells] = useState(false);

  useEffect(() => {
    console.log(creature);
    if (creature.spells.innate_spell_caster !== undefined) {
      setInnateSpells(creature.spells.innate_spell_caster);
      setShowInnateSpells(true);
    }
    if (creature.spells.spell_caster !== undefined) {
      setSpells(creature.spells.spell_caster);
      setShowSpells(true);
    }
  }, [creature, spells, innateSpells]);

  const SpellInfoModal = async (spell) => {
    setLoading(true);
    let parsedSpell = spell.trim();
    parsedSpell = parsedSpell.replaceAll(" ", "-");
    let spellData = {};
    await getSpell(parsedSpell)
      .then((data) => {
        if (data) {
          console.log(data);
          spellData = data;
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return Modal.info({
      title: spellData.name,
      width: "60vw",
      className: "info-modal",
      content: loading ? (
        <Spin />
      ) : (
        <div>
          <Descriptions layout="horizontal" column={1}>
            <Descriptions.Item>
              <label>Casting Time: {spellData.casting_time}</label>
            </Descriptions.Item>
            <Descriptions.Item>
              <label>Range: {spellData.range}</label>
            </Descriptions.Item>
            <Descriptions.Item>
              <label>Duration: {spellData.duration}</label>
            </Descriptions.Item>
            <Descriptions.Item>
              <label>Concentration: {spellData.concentration}</label>
            </Descriptions.Item>
            <Descriptions.Item>
              <label>Components: {spellData.components}</label>
            </Descriptions.Item>
            <Descriptions.Item>
              <label>Ritual Castable: {spellData.ritual}</label>
            </Descriptions.Item>
            <Descriptions.Item>
              <label>School of Magic: {spellData.school}</label>
            </Descriptions.Item>
            <Descriptions.Item>
              <p>{spellData.desc}</p>
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
      oncancel: {},
    });
  };

  const SpellLevelCards = ({ level, title }) => {
    return (
      <Col span={8}>
        <Card title={title} className="spell-card-style">
          {level.map((value) => (
            <div style={{ textAlign: "left" }}>
              <Button
                onClick={() => SpellInfoModal(value)}
                icon={<QuestionCircleOutlined />}
              ></Button>
              <span>{value}</span>
            </div>
          ))}
        </Card>
      </Col>
    );
  };

  const InnateSpellCasterCard = ({ visible }) => {
    return visible ? (
      <Card title="Innate Spell Caster Attributes">
        <label>
          Spell Save DC: {innateSpells.mappedValues.get("spell_save_dc")}
        </label>
        <label>
          Spell Attack Bonus: {innateSpells.mappedValues.get("spell_attack")}
        </label>
      </Card>
    ) : (
      <Spin />
    );
  };

  const SpellCasterCard = ({ visible }) => {
    return visible ? (
      <>
        <Row sm={2}>
          <Col span={12}>
            <Card title="Spell Caster Attributes">
              <Space>
                <label>
                  Spell Save DC:{" "}
                  {spells.mappedValues.has("spell_save_dc")
                    ? spells.mappedValues.get("spell_save_dc")
                    : "None"}
                </label>
                <br />
                <label>
                  Spell Attack Modifier:{" "}
                  {spells.mappedValues.has("spell_attack")
                    ? spells.mappedValues.get("spell_attack")
                    : "0"}
                </label>
              </Space>
            </Card>
          </Col>
          <Col span={12}>
            {spells.mappedValues.has("cantrips") ? (
              <Card title="Cantrips">
                {spells.mappedValues.get("cantrips").map((value) => (
                  <div style={{ textAlign: "left" }}>
                    <Button
                      onClick={() => SpellInfoModal(value)}
                      icon={<QuestionCircleOutlined />}
                    ></Button>
                    <span>{value}</span>
                  </div>
                ))}
              </Card>
            ) : null}
          </Col>
        </Row>
        <Row sm={3}>
          {spells.mappedValues.has("1st_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("1st_level")}
              title={"1st Level"}
            />
          ) : null}
          {spells.mappedValues.has("2nd_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("2nd_level")}
              title={"2nd_level"}
            />
          ) : null}
          {spells.mappedValues.has("3rd_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("3rd_level")}
              title={"3rd Level"}
            />
          ) : null}
          {spells.mappedValues.has("4th_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("4th_level")}
              title={"4th Level"}
            />
          ) : null}
          {spells.mappedValues.has("5th_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("5th_level")}
              title={"5th Level"}
            />
          ) : null}
          {spells.mappedValues.has("6th_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("6th_level")}
              title={"6th Level"}
            />
          ) : null}
          {spells.mappedValues.has("7th_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("7th_level")}
              title={"7th Level"}
            />
          ) : null}
          {spells.mappedValues.has("8th_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("8th_level")}
              title={"8th Level"}
            />
          ) : null}
          {spells.mappedValues.has("9th_level") ? (
            <SpellLevelCards
              level={spells.mappedValues.get("9th_level")}
              title={"9th Level"}
            />
          ) : null}
        </Row>
      </>
    ) : (
      <Spin />
    );
  };

  return (
    <>
      <InnateSpellCasterCard visible={showInnateSpells} />
      <SpellCasterCard visible={showSpells} />
    </>
  );
};

export default SpellCard;
