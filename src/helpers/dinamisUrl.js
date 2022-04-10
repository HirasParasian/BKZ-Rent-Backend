/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
exports.dinamisUrl = (data) => {
  let url = '';
  let i = 0;

  if (data) {
    let temp = Object.entries(data).length - 1;

    if (data.page) {
      temp -= 1;
    }
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'page') {
        url += `${key}=${value}`;
        if (i < temp) {
          url += '&';
        }
        i++;
      }
    }
  }
  return url;
};
