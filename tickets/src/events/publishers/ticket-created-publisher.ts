import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@michaldobiezynski_tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
