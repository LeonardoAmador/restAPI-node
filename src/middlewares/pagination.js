import IncorrectRequest from "../errors/IncorrectRequest.js";

const pagination = async (req, res, next) => {
  try {
    let { limit = 5, page = 1, ordering = "_id:-1" } = req.query;
    let [orderField, order] = ordering.split(":");

    const result = req.result;

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    if (limit > 0 && page > 0) {
      const paginatedResult = await result
        .find()
        .sort({ [orderField]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();  
      res.status(200).json(paginatedResult);
    } else {
      next(new IncorrectRequest());
    }
  } catch (error) {
    next(error);
  }
};

export default pagination;