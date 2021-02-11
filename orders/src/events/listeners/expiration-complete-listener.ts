import { natsWrapper } from "./../../__mocks__/nats-wrapper";
import {
  Listener,
  Subjects,
  ExpirationComplete,
  OrderStatus,
} from "@michaldobiezynski_tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";
import { OrderCancelledPublished } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationComplete> {
  queueGroupName = queueGroupName;
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationComplete["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    await new OrderCancelledPublished(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
