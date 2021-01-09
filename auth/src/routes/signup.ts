import { DatabaseConnectionError } from "./../errors/database-connection-error";
import { RequestValidationError } from "./../errors/request-validation-error";
import express, { Request, Response } from "express";
import "express-async-errors";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    throw new DatabaseConnectionError();

    console.log("Creating a user...");
    res.send({});
  }
);

export { router as signupRouter };