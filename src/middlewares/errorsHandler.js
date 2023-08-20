import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
const errorsHandler = (error, req, res, next) => {
  console.log(error);

  if (error instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: "One or more provided datas are incorrect." });
  } else {
    res
      .status(500)
      .send({ message: `Internal server error - ${error.message}` });
  }
};

export default errorsHandler;