const { BadRequestError } = require("./errors");

/**
 * @description Object형식으로 데이터를 받아 해당 데이터들의 유효성을 검증합니다.
 *              유효성 검사 규칙은 메서드 내에 미리 정해져 있습니다.
 */
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
  /**
   * @description 숫자1자 이상의 숫자+영어 형태의 데이터만 유효한 데이터로 판단합니다.
   * @param {string} password
   */
  validatePassword({ password }) {
    const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{6,}$/;

    if (!passwordRegex.test(password)) {
      throw new BadRequestError(`Invalid password`);
    }
    return;
  }
  /**
   * @description Object의 value가 빈값인 경우에 "Invalid Key이름" 을 반환합니다
   * @param {Object} valueObject
   */
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
