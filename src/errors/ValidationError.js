import IncorrectRequest from "./IncorrectRequest.js";

class ValidationError extends IncorrectRequest {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");
    
    super(`The following erros were found: ${errorMessages}`);
  }
}

export default ValidationError;