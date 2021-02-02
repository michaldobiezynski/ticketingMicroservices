import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@michaldobiezynski_tickets/common";

export class OrderCancelledPublished extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
