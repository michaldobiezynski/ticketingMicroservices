import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@michaldobiezynski_tickets/common";

export class OrderCreatedPublished extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

