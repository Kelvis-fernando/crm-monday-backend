import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/tickets", async (req, res) => {
  const tickets = await prisma.tickets.findMany({});
  res.send(tickets);
});

app.post("/ticket", async (req, res) => {
  const data = req.body;
  const ticket = await prisma.tickets.create({
    data: {
      title: data.title,
      owner: data.owner,
      avatar: data.avatar,
      status: data.status,
      progress: data.progress,
      description: data.description,
    },
  });

  res.status(201).json(ticket);
});

app.delete("/ticket/remove/:id", async (req, res) => {
  const ticketId = req.params.id;
  await prisma.tickets.delete({
    where: {
      id: ticketId,
    },
  });
  res.status(204).send("Delete ticket success");
});

app.put("/ticket/update/:id", (req, res) => {
  res.send("update ticket");
});

app.listen(3333, () => console.log("App running in port 3333"));
