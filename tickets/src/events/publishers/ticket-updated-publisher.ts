import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@michaldobiezynski_tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
