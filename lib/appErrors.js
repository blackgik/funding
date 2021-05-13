class CrowdFundingErrors extends Error {
  constructor(message, errorCode = 500) {
    super(message);
    this.errorCode = errorCode;
    this.isOperational = true;
    this.name = "crowdFunding";
    this.date = new Date();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor); //removes this from the error stacks trace
    }
  }
}

class BadRequestError extends CrowdFundingErrors {
  constructor(message = "Bad request", errorCode = 400) {
    super(message, errorCode);
  }
}

class NotFoundError extends CrowdFundingErrors {
  constructor(message = "Request not found", errorCode = 404) {
    super(message, errorCode);
  }
}
class UnauthorizedError extends CrowdFundingErrors {
  constructor(message = "Unauthorized", errorCode = 401) {
    super(message, errorCode);
  }
}

class ExpectationFailureError extends CrowdFundingErrors {
  constructor(message = "Form validation Error", erroCode = 405) {
    super(message, erroCode);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ExpectationFailureError,
};
