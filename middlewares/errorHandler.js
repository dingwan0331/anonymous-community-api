/**
 * @description response 되기전에 에러를 받아 터미널상에 출력합니다.
 */
const errorLogger = (err, req, res, next) => {
  console.error(err);
  next(err);
};

/**
 * @description error를 받아 서비스로직상 잡아낸 에러는 해당 스테이터스와 메세지를 반환하며
 *              그외 에러들은 500 "Server Error"를 반환합니다.
 */
const errorResponder = (err, req, res, next) => {
  const { statusCode, message, isCustom } = err;
  if (isCustom) res.status(statusCode).json({ message: message });
  else {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { errorLogger, errorResponder };
