export const getAbilityScoreBonus = (score) => {
  let bonus;
  if (score > 10) {
    bonus = Math.floor((score - 10) / 2);
  } else if (score === 10) {
    bonus = 0;
  } else {
    if (score % 2 === 0) {
      score += 1;
    }
    switch (score) {
      case 9: {
        bonus = -1;
        break;
      }
      case 7: {
        bonus = -2;
        break;
      }
      case 5: {
        bonus = -3;
        break;
      }
      case 3: {
        bonus = -4;
        break;
      }
      case 1: {
        bonus = -5;
        break;
      }
      default: {
      }
    }
  }
  return bonus;
};

export const rollDice = (abilityScoreBonus) => {
  let diceRolled = Math.floor(Math.random() * 20);
  if (diceRolled === 0) {
    diceRolled = 1;
  }
  return { value: diceRolled + abilityScoreBonus, diceRolled };
};
