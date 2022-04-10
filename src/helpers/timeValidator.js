const moment = require('moment-timezone');

const isTime = (time) => {
  let itsTime = '';
  if (moment(time, 'HH:mm', true).isValid()) {
    itsTime = time;
  } else if (moment(time, 'HH:mm:ss', true).isValid()) {
    itsTime = time;
  } else {
    itsTime = moment(time, 'LT').format('HH:mm');
  }
  return itsTime;
};

module.exports = isTime;
