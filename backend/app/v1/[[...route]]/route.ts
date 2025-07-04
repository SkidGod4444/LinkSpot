import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import chat from "./routes/ai/chat";
import clubs from "./routes/clubs";
import users from "./routes/users";
import events from "./routes/events";

export const runtime = "edge";
const app = new Hono().basePath("/v1");

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use(logger());

app.route("/ai/chat", chat);
app.route("/clubs", clubs);
app.route("/users", users);
app.route("/events", events);

const GET = handle(app);
const POST = handle(app);
const PATCH = handle(app);
const DELETE = handle(app);
const OPTIONS = handle(app);
const PUT = handle(app);

export { GET, PUT, PATCH, POST, DELETE, OPTIONS };
