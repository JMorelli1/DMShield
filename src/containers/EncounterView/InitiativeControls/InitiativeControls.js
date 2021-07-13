import { Button, Popconfirm, Switch } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rollDice } from "../../../services/MathEqService";
import { setGroupInitiative, setSelectedEncounter } from "../../../redux/actions/EncounterActions";
import AddPlayersModal from "../AddPlayersModal/AddPlayersModal";
import _ from 'lodash'
import "./InitiativeControls.css";

const InitiativeControls = () => {
  const selectedEncounter = useSelector((state) => state.selectedEncounter);
  const encounters = useSelector((state) => state.encounterData);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [disableInitiative, setDisableInitiative] = useState(true);
  const [startStep, setStartStep] = useState(1);

  const handleRollInitiative = () => {
    let initEncounter = [];
    let initRolls;
    let diceRoll;
    selectedEncounter.encounter.creatures.forEach((creature) => {
      initRolls = selectedEncounter.shouldGroupInit ? creature.count : 1;
      for (let i = 1; i <= creature.count; i++) {
        if (initRolls >= i) {
          diceRoll = rollDice(
            creature.abilityScoreBonus.dexterity
          );
        }
        initEncounter = [
          ...initEncounter,
          {
            ...creature,
            name: (creature.count === 1 ? creature.name : creature.name + "-" + i),
            slug: (creature.count === 1 ? creature.slug : creature.slug + "-" + i),
            count: 1,
            initiative: {
              total: diceRoll.value,
              diceRolled: diceRoll.diceRolled,
            }
          },
        ];
      }
    });
    initEncounter.sort((a, b) => (a.initiative.total > b.initiative.total ? -1 : 1));
    dispatch(
      setSelectedEncounter({
        ...selectedEncounter,
        encounter: {
          ...selectedEncounter.encounter,
          creatures: [...initEncounter],
        },
      })
    );
    setDisableInitiative(false);
  };

  const handleNextTurn = () => {
    let temp = [...selectedEncounter.encounter.creatures];
    let prevTurn = temp.splice(0, 1);
    temp.push(prevTurn[0]);
    dispatch(
      setSelectedEncounter({
        ...selectedEncounter,
        encounter: {
          ...selectedEncounter.encounter,
          creatures: [...temp],
        },
      })
    );
  };

  const resetEncounter = () => {
    const resetIndex = _.findIndex(encounters, {'name': selectedEncounter.name});
    dispatch(setSelectedEncounter(encounters[resetIndex]));
    setStartStep(1);
    setDisableInitiative(true);
  }

  const handleAddPlayers = () => {
    setShowModal(!showModal);
    setStartStep(3);
  }

  return (
    <div className={"view-controls"}>
      {startStep === 1 ? <div>
        <Button type="primary" className={"start-encounter-btn"} onClick={() => setStartStep(2)}>Start
          Encounter</Button>
      </div> : null}
      {startStep === 2 ? <div className={"handle-btns"}>
        <div>
          <label className={"group-initiative"}>Group Initiative:</label>
          <Switch
            defaultChecked
            onChange={() => dispatch(setGroupInitiative(!selectedEncounter.shouldGroupInit))}
          />
        </div>
        <div className={"handle-btns"}>
          <Button onClick={handleRollInitiative} disabled={!disableInitiative}>
            Roll Initiative
          </Button>
          <Button onClick={handleAddPlayers} disabled={disableInitiative}>
            Add Players
          </Button>
        </div>
      </div> : null}
      {startStep === 3 ? <div className={"handle-btns"}>
        <Button onClick={handleNextTurn}>Next Turn</Button>
        <Popconfirm title="Are you sure?"
                    onConfirm={resetEncounter}
        >
          <Button type={"danger"}>Restart Encounter</Button>
        </Popconfirm>
      </div> : null}
      <AddPlayersModal isShown={showModal} setIsShown={setShowModal}/>
    </div>
  );
}
export default InitiativeControls;
