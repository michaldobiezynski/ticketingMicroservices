import express, { Request, Response } from "express";
import { body } from "express-validator";

import { Ticket } from "../models/tickets";
import {
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorisedError,
  requireAuth,
} from "@michaldobiezynski_tickets/common";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greated than 0."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorisedError();
    }

    ticket.set({ title, price });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
