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

app.post("/ticket", (req, res) => {
  res.send(req.body);
});

app.delete("/ticket/remove/:id", (req, res) => {
  res.send("delete ticket");
});

app.put("/ticket/update/:id", (req, res) => {
  res.send("update ticket");
});

app.listen(3333, () => console.log("App running in port 3333"));
