export const parseInnateSpellCastingText = (spellText) => {
  let mappedValues = new Map();
  const spellDCPattern = {
    name: "spell_save_dc",
    pattern: /(save dc|spell save dc) \d{1,2}/gi,
  };
  const atWillPattern = {
    name: "at_will",
    pattern: /at will:\D+/gi,
  };
  const perDayPattern = {
    name: "per_day",
    pattern: /\d\/\D+/gi,
  };

  const patterns = [spellDCPattern, atWillPattern, perDayPattern];

  let spellTextTrimmed = spellText.replaceAll("\n", "");
  console.log(spellTextTrimmed);

  patterns.forEach((pattern) => {
    let parsedValue;
    let perDaySpells = [];
    let temp = spellTextTrimmed.match(pattern.pattern);
    if (temp != null && temp.length >= 1) {
      temp.forEach((value) => {
        switch (pattern.name) {
          case "spell_save_dc": {
            let parsedValue = value.replace(/\D+/gi, "");
            mappedValues.set(pattern.name, parsedValue);
            break;
          }
          case "at_will": {
            parsedValue = value.replace(/\D+:/gi, "").split(",");
            mappedValues.set(pattern.name, parsedValue);
            break;
          }
          case "per_day": {
            let splits = value.split(":");
            let totalPerDay = splits[0].replace(/[a-z|\D]+/gi, "");
            parsedValue = splits[1].split(",");
            let perDay = {
              totalPerDay,
              parsedValue,
            };
            perDaySpells = [
              ...perDaySpells,
              perDay
            ]
            break;
          }
          default: {
          }
        }
        mappedValues.set("per_day", perDaySpells);
      });
    }
  });
  return {mappedValues};
};

export const parseSpellCastingText = (spellText) => {
  let mappedValues = new Map();
  const spellDCPattern = {
    name: "spell_save_dc",
    pattern: /spell save DC \d{1,2}/gi,
  };
  const spellAttackPattern = {
    name: "spell_attack",
    pattern: /(\+)\d*/gi,
  };
  const cantripSpellPattern = {
    name: "cantrips",
    pattern: /cantrips \(at will\): [a-z|\s|,]+/gi,
  };
  const firstSpellPattern = {
    name: "1st_level",
    pattern: /1st level \(\d [slots|slot): a-z|\s|,]+/gi,
  };
  const secondSpellPattern = {
    name: "2nd_level",
    pattern: /2nd level \(\d [slots|slot): a-z|\s|,]+/gi,
  };
  const thirdSpellPattern = {
    name: "3rd_level",
    pattern: /3rd level \(\d [slots|slot): a-z|\s|,]+/gi,
  };
  const fourthSpellPattern = {
    name: "4th_level",
    pattern: /4th level \(\d [slots|slot): a-z|\s|,]+/gi,
  };
  const fifthSpellPattern = {
    name: "5th_level",
    pattern: /5th level \(\d [slots|slot): a-z|\s|,]+/gi,
  };
  const sixthSpellPattern = {
    name: "6th_level",
    pattern: /6th level \(\d [slots|slot): a-z|\s|,]+/gi,
  };
  const seventhSpellPattern = {
    name: "7th_level",
    pattern: /7th level \(\d [slots|slot): a-z|\s|,]+/gi,
  };
  const eigthSpellPattern = {
    name: "8th_level",
    pattern: /8th level \(\d [slots|slot): a-z|\s|,]+/gi,
  };
  const ninethSpellPattern = {
    name: "9th_level",
    pattern: /9th level \(\d [slots|slot): a-z|\s|,]+/gi,
  };

  const patterns = [
    spellDCPattern,
    spellAttackPattern,
    cantripSpellPattern,
    firstSpellPattern,
    secondSpellPattern,
    thirdSpellPattern,
    fourthSpellPattern,
    fifthSpellPattern,
    sixthSpellPattern,
    seventhSpellPattern,
    eigthSpellPattern,
    ninethSpellPattern,
  ];

  let spellTextTrimmed = spellText.replaceAll("\n", "");
  spellTextTrimmed = spellTextTrimmed.replaceAll("•", ";");
  console.log(spellTextTrimmed);

  patterns.forEach((pattern) => {
    let parsedValue;
    let temp = spellTextTrimmed.match(pattern.pattern);
    if (temp != null && temp.length >= 1) {
      temp.forEach((value) => {
        switch (pattern.name) {
          case "spell_save_dc": {
            parsedValue = value.replace(/[a-z|\D]+/, "");
            mappedValues.set(pattern.name, parsedValue);
            break;
          }
          case "spell_attack": {
            parsedValue = value.replace(/[a-z|\D]+/, "");
            mappedValues.set(pattern.name, parsedValue);
            break;
          }
          default: {
            let splits = value.replace(";", "").split(":");
            parsedValue = splits[1].split(",");
            mappedValues.set(pattern.name, parsedValue);
          }
        }
      });
    }
  });
  return {mappedValues};
};

export const parseCR = (cr) => {
  let splitCR = cr.split("/");
  if (splitCR.length > 1) {
    return parseFloat(splitCR[0], 10) / parseFloat(splitCR[1], 10);
  } else {
    return parseFloat(splitCR[0], 10);
  }
};
