import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("fetches the order", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const userOne = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", userOne)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error if one user tries to fetch another users order", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const userOne = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
