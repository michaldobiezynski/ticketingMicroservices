import {
  Publisher,
  ExpirationComplete,
  Subjects,
} from "@michaldobiezynski_tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

