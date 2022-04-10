const isNull = (data, dataName) => {
  let itsNull = 0;
  dataName.forEach((x) => {
    if (!data[x]) {
      itsNull += 1;
    }
  });
  return itsNull;
};

module.exports = isNull;
