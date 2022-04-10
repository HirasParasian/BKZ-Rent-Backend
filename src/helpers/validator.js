const isTime = require('./timeValidator');

const checkIntegerFormat = (data) => /^[1-9][0-9]*$/.test(data); // check apakah data isinya hanya digit yang awalnya bukan 0
const checkIntegerFormatCanZero = (data) => /^[1-9][0-9]*$|^0$/.test(data); // check apakah data isinya hanya digit yang awalnya bukan 0
const checkPriceFormat = (data) => /^[^-0+]\d+.\d{2}?$/.test(data) || /^0$/.test(data);
const checkBoolean = (data) => /^[01]$/.test(data);
const phoneNumberValidation = (data) => /^[+0]\d+$/.test(data);
const dateValidation = (data) => /^[^0]\d{3}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(data);
const emailValidation = (data) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data);
const passwordValidation = (data) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20})/.test(data);

const idValidator = (id) => {
  if (/^[1-9][0-9]*/.test(id)) {
    return true;
  }
  return false;
};

const varcharValidator = (data, max = 255, min = 1) => {
  if (data.length >= min && data.length <= max) {
    return true;
  }
  return false;
};

const enumValidator = (data, options) => options.includes(data);

const comparePassword = (password1, password2) => password1 === password2;

const compareDate = (start, end) => {
  const dateStart = new Date(start);
  const dateEnd = new Date(end);
  if (dateStart < dateEnd) {
    return -1;
  }
  if (dateStart > dateEnd) {
    return 1;
  }
  return 0;
};

const inputValidator = (req, fillable) => {
  const error = [];
  const data = {};
  fillable.forEach((input) => {
    if (!req.body[input.field] && input.required) {
      error.push(`${input.field} cannot be empty`);
    } else if (req.body[input.field]) {
      let trimmedBody = req.body[input.field].trim();
      if (input.type === 'integer') {
        if (input.can_zero) {
          if (!checkIntegerFormatCanZero(trimmedBody)) {
            error.push(`Invalid ${input.field} format`);
          }
        } else if (!checkIntegerFormat(trimmedBody)) {
          error.push(`Invalid ${input.field} format`);
        }
      }
      if (input.type === 'price' && !checkPriceFormat(trimmedBody)) {
        error.push(`Invalid ${input.field} format`);
      }
      if (input.type === 'varchar' && !varcharValidator(trimmedBody, input.max_length)) {
        error.push(`Invalid ${input.field} format`);
      }
      if (input.type === 'boolean' && !checkBoolean(trimmedBody)) {
        error.push(`Invalid ${input.field} format`);
      }
      if (input.type === 'time') {
        if (isTime(trimmedBody) === 'Invalid date') {
          error.push(`Invalid ${input.field} format`);
        } else {
          trimmedBody = isTime(trimmedBody);
        }
      }
      if (input.type === 'text' && trimmedBody.length === 0) {
        error.push(`Invalid ${input.field} format`);
      }
      if (input.type === 'enum' && !enumValidator(trimmedBody, input.options)) {
        error.push(`Invalid ${input.field} format`);
      }
      if (input.type === 'password' && !input.by_pass_validation && !passwordValidation(trimmedBody, input.options)) {
        error.push('Your password must include 1 uppercase, 1 lowercase, 1 number and at least 8 characters long');
      }
      if (input.type === 'email') {
        if (!emailValidation(trimmedBody)) {
          error.push(`Invalid ${input.field} format`);
        } else if (!varcharValidator(trimmedBody, input.max_length)) {
          error.push(`Invalid ${input.field} format`);
        }
      }
      if (input.type === 'phone_number') {
        if (!phoneNumberValidation(trimmedBody)) {
          error.push(`Invalid ${input.field} format`);
        } else if (!varcharValidator(trimmedBody, input.max_length)) {
          error.push(`Invalid ${input.field} format`);
        }
      }
      // if (input.type === 'date' && !dateValidation(trimmedBody)) {
      //   error.push(`Invalid ${input.field} format`);
      // }
      data[input.field] = trimmedBody;
    }
  });
  return { error, data };
};

module.exports = {
  checkIntegerFormat,
  checkPriceFormat,
  checkBoolean,
  phoneNumberValidation,
  dateValidation,
  emailValidation,
  passwordValidation,
  idValidator,
  varcharValidator,
  inputValidator,
  comparePassword,
  compareDate,
};
