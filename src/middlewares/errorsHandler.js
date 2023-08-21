import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationError.js";
import NotFound from "../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
const errorsHandler = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendResponse(res);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  }

  if (error instanceof NotFound) {
    error.sendResponse(res);
  }

  new BaseError().sendResponse(res);
};

export default errorsHandler;