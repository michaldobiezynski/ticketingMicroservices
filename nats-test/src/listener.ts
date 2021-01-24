import { TicketCreatedListener } from "./events/ticket-created-listener";
import { randomBytes } from "crypto";
import nats from "node-nats-streaming";

console.clear();

//stan is just a client, nats reversed
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATSconnection closed!");
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
