import { TicketUpdatedPublisher } from "./../publishers/ticket-updated-publisher";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@michaldobiezynski_tickets/common";
import { Ticket } from "../../models/tickets";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If not ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // Mark the ticket as being reserved by setting its orderId proprty
    ticket.set({ orderId: data.id });

    // Save the ticket
    await ticket.save();

    new TicketUpdatedPublisher()

    // ack the message
    msg.ack();
  }
}
