const { BadRequestError } = require("./errors");

class Validator {
  constructor(inputObject) {
    this.config = {
      password: this.validatePassword,
      title: this.validateNull,
      content: this.validateNull,
      userName: this.validateNull,
    };
    for (let i = 0; i < Object.keys(inputObject).length; i++) {
      const key = Object.keys(inputObject)[i];
      const outputObject = {};
      outputObject[key] = inputObject[key];

      this.config[key](outputObject);
    }
  }
  validatePassword({ password }) {
    const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{6,}$/;

    if (!passwordRegex.test(password)) {
      throw new BadRequestError(`Invalid password`);
    }
    return;
  }
  validateNull(valueObject) {
    const value = Object.values(valueObject)[0];
    const key = Object.keys(valueObject)[0];

    if (!value) {
      throw new BadRequestError(`Invalid ${key}`);
    }
    return;
  }
}

module.exports = { Validator };
