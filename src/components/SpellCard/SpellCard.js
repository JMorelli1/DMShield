import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Empty, Modal, Row, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getSpell } from "../../services/Open5eService";
import _ from "lodash";
import "./SpellCard.css";

const SpellCard = ({creature}) => {
  const [loading, setLoading] = useState();
  const [innateSpells, setInnateSpells] = useState(new Map());
  const [spells, setSpells] = useState(new Map());
  const [showInnateSpells, setShowInnateSpells] = useState(false);
  const [showSpells, setShowSpells] = useState(false);

  useEffect(() => {
    if (creature.spells.innate_spell_caster !== undefined) {
      setInnateSpells(creature.spells.innate_spell_caster.mappedValues);
      setShowInnateSpells(true);
    }
    if (creature.spells.spell_caster !== undefined) {
      setSpells(creature.spells.spell_caster.mappedValues);
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
        <Spin/>
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
              <label>Ritually Castable: {spellData.ritual}</label>
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

  const SpellLevelCards = ({level, title}) => {
    return (
      <Col span={8}>
        <Card title={title} className="spell-card-style">
          {_.isEmpty(level)
            ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            : level.map((value, index) => (
              <div style={{textAlign: "left"}}>
                <Button
                  key={index}
                  onClick={() => SpellInfoModal(value)}
                  icon={<QuestionCircleOutlined/>}
                />
                <span>{value}</span>
              </div>
            ))}
        </Card>
      </Col>
    );
  };

  const InnateSpellCasterCard = () => {
    return (
      <>
        <Row sm={2}>
          <Col span={12}>
            <Card title="Innate Spell Caster Attributes" style={{height: "100%"}}>
              <label>
                Spell Save DC: {innateSpells.get("spell_save_dc")}
              </label>
            </Card>
          </Col>
          <Col span={12}>
            {innateSpells.has("at_will") ? (
              <Card title="At Will">
                {innateSpells.get("at_will").map((value) => (
                  <div style={{textAlign: "left"}}>
                    <Button
                      onClick={() => SpellInfoModal(value)}
                      icon={<QuestionCircleOutlined/>}
                    />
                    <span>{value}</span>
                  </div>
                ))}
              </Card>
            ) : null}
          </Col>
        </Row>
        <Row sm={3}>
          {innateSpells.get('per_day').map(spells => {
            return (
              <SpellLevelCards
                level={spells.parsedValue}
                title={`${spells.totalPerDay} Per Day`}
              />
            );
          })}
        </Row>
      </>);
  };

  const SpellCasterCard = () => {
    return (
      <>
        <Row sm={2}>
          <Col span={12}>
            <Card title="Spell Caster Attributes" style={{height: "100%"}}>
              <Space direction={"vertical"}>
                <label>
                  Spell Save DC:{" "}
                  {spells.has("spell_save_dc")
                    ? spells.get("spell_save_dc")
                    : "None"}
                </label>
                <br/>
                <label>
                  Spell Attack Modifier:{" "}
                  {spells.has("spell_attack")
                    ? spells.get("spell_attack")
                    : "0"}
                </label>
              </Space>
            </Card>
          </Col>
          <Col span={12}>
            {spells.has("cantrips") ? (
              <Card title="Cantrips" extra={"At Will"}>
                {spells.get("cantrips").map((value) => (
                  <div style={{textAlign: "left"}}>
                    <Button
                      onClick={() => SpellInfoModal(value)}
                      icon={<QuestionCircleOutlined/>}
                    />
                    <span>{value}</span>
                  </div>
                ))}
              </Card>
            ) : null}
          </Col>
        </Row>
        <Row sm={3}>
          <SpellLevelCards
            level={spells.get("1st_level")}
            title={"1st Level"}
          />
          <SpellLevelCards
            level={spells.get("2nd_level")}
            title={"2nd_level"}
          />
          <SpellLevelCards
            level={spells.get("3rd_level")}
            title={"3rd Level"}
          />
          <SpellLevelCards
            level={spells.get("4th_level")}
            title={"4th Level"}
          />
          <SpellLevelCards
            level={spells.get("5th_level")}
            title={"5th Level"}
          />
          <SpellLevelCards
            level={spells.get("6th_level")}
            title={"6th Level"}
          />
          <SpellLevelCards
            level={spells.get("7th_level")}
            title={"7th Level"}
          />
          <SpellLevelCards
            level={spells.get("8th_level")}
            title={"8th Level"}
          />
          <SpellLevelCards
            level={spells.get("9th_level")}
            title={"9th Level"}
          />
        </Row>
      </>
    );
  };

  return (
    <>
      {showInnateSpells ? <InnateSpellCasterCard/> : null}
      {showSpells ? <SpellCasterCard/> : null}
    </>
  );
};

export default SpellCard;
