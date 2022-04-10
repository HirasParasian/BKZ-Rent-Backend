const generateOtp = (otpLength) => {
  let randomCode = '';
  while (randomCode.length < otpLength) {
    randomCode += Math.floor(Math.random() * 9);
  }
  return randomCode;
};

module.exports = { generateOtp };
