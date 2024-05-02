import { Elysia } from "elysia";
import { db } from "../../index";

export const api = (app: Elysia) =>
  app.group("api", (app) =>
    app
      .get("/", () => console.log("api test"))
      .get("/test", () => "api test")
      .post("/", () => {}),
  );
