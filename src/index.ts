import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { createDB } from "./db/dbconfig";
import cors from "@elysiajs/cors";
import { auth } from "./routes/auth";
import { main } from "./routes/main";
import { api } from "./routes/api";

export const db = await createDB();

export const setupCors = new Elysia({ name: "setupCors" })
  // .use(cors({ origin: `/api[s]?:\/\/localhost:${4000}/g` }))
  .use(
    cors({
      origin: (req) => {
        const re = new RegExp(`http[s]?:\\/\\/localhost:${4000}`);
        return re.test(req.headers.get("origin") || "");
      },
      credentials: true,
      allowedHeaders:
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
    }),
  );

const app = new Elysia()
  .use(setupCors)
  .use(
    swagger({
      documentation: {
        info: {
          title: "Kovka chat Documentation",
          version: "1.0.0",
        },
        tags: [
          {
            name: "auth",
            description: "Authentication endpoints",
          },
        ],
      },
      provider: "scalar",
    }),
  )
  .onError(({ code, error }) => {
    if (code === "VALIDATION") {
      return Response.json({ message: error.message }, { status: 400 });
    }
  })
  .use(main)
  .use(auth)
  .use(api)
  .listen(process.env.SERVER_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
