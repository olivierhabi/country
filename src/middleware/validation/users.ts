import initMiddleware from "../init-middleware";
import validateMiddleware from "../validate-middleware";
import { check, validationResult, ValidationChain } from "express-validator";

export const validateSignUp = initMiddleware(
  validateMiddleware(
    [
      check("email").isEmail().withMessage("Email must be a valid"),
      check("password")
        .isLength({ min: 6, max: 40 })
        .withMessage("Password must be at least 6 chars long"),
      check("firstName")
        .isLength({ min: 3, max: 400 })
        .withMessage("First Name must be at least 3 chars long"),
      check("lastName")
        .isLength({ min: 3, max: 400 })
        .withMessage("Last Name must be at least 3 chars long"),
      check("birthdate")
        .isLength({ min: 3, max: 1200 })
        .withMessage("Birth Date must be at least 3 chars long"),
    ],
    validationResult
  )
);
