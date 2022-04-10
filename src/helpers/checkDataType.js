const isNumber = (data, dataName) => {
  let notNumber = 0;
  dataName.forEach((x) => {
    if (data[x] && Number.isNaN(Number(data[x]))) {
      notNumber += 1;
    }
  });
  return notNumber;
};

module.exports = isNumber;
