import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

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

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable();

  const subscription = stan.subscribe("ticket:created", options);

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
