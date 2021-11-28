import { NextApiRequest, NextApiResponse } from "next";
import { check, validationResult, ValidationChain } from "express-validator";

type Validations = (req: object) => any;

export default function validateMiddleware(
  validations: Array<any>,
  validationResult: Validations
) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<object>,
    next: Function
  ) => {
    await Promise.all(
      validations.map((validation) => {
        validation.run(req);
      })
    );
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({
      status: "Error",
      message: "success",
      data: errors.array(),
    });
  };
}
