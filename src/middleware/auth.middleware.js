import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

const verifyJWT = (req, res, next) => {
  try {
    let token = req.cookies.accessToken;

    if (!token) {
      throw new ApiError(403, "token not found");
    }

    let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(401, "token valid");
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

export { verifyJWT };
