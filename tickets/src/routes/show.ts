import express, { Request, Response } from "express";
import { requireAuth } from "@michaldobiezynski_tickets/common";
import { body } from "express-validator";

import { Ticket } from "../models/tickets";
import { NotFoundError } from "@michaldobiezynski_tickets/common";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
