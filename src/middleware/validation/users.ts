import initMiddleware from "../init-middleware";
import validateMiddleware from "../validate-middleware";
import { check, validationResult,ValidationChain } from "express-validator";

export const validateSignUp= initMiddleware(
  validateMiddleware(
    [
      check("email").isEmail().withMessage("Email must be a valid"),
      check("password")
        .isLength({ min: 6, max: 40 })
        .withMessage("Password must be at least 6 chars long"),
    ],
    validationResult
  )
);
