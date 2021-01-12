import { NotAuthorisedError } from "./../errors/not-authorised-error";
import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorisedError();
  }

  next();
};
