class BasicError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isCustom = true;
  }
}

class BadRequestError extends BasicError {
  constructor(message) {
    super("BadRequestError", message, 400);
  }
}

//해당 리소스에 유효한 인증 자격 증명이 없기 때문에 요청이 적용되지 않은 상태
class UnauthorizedError extends BasicError {
  constructor(message) {
    super("Unauthorized", message, 401);
  }
}

// 서버에 요청이 전달되었지만, 권한 때문에 거절된 상태
class ForbiddenError extends BasicError {
  constructor(message) {
    super("Forbidden", message, 403);
  }
}

// 서버가 요청받은 리소스를 찾을 수 없는 상태
class NotFoundError extends BasicError {
  constructor(message = "Not Found url") {
    super("NotFoundError", message, 404);
  }
}

module.exports = {
  BasicError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
