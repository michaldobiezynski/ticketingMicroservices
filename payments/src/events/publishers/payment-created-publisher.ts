import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@michaldobiezynski_tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
