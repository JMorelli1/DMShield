export const returnZeroIfUndefined = (object) => {
  return object === undefined ? 0 : object;
};

export const configTernary = (object, validation, returnItem) => {
  return object === validation ? returnItem : object;
};

export const wrapInParens = (score) => {
  if (score >= 0) {
    return `(+${score})`;
  } else {
    return `(${score})`;
  }
};
