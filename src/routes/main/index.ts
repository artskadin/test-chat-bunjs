import { Elysia } from "elysia";

export const main = (app: Elysia) =>
  app
    .get("/", () => "kovka")
    .get("/ping", () => {
      console.log("pong");
      return "pong";
    });
