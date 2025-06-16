/* eslint-disable import/no-unresolved */
import { createEvent, getEvents } from "@/lib/actions";
import { ID } from "appwrite";
import { Hono } from "hono";

const events = new Hono();

events.get("/", async (c) => {
  try {
    const response = await getEvents();

    if (!response || response.length === 0) {
      console.warn("No events found");
      c.status(404);
      return c.json({ 
        status: 404,
        message: "No events found" 
      });
    }

    c.status(200);
    return c.json({
      status: 200,
      data: response
    });
  } catch (error: unknown) {
    console.error("Error fetching events:", error instanceof Error ? error.message : error);
    c.status(500);
    return c.json({ 
      status: 500,
      message: "Error fetching events: " + (error instanceof Error ? error.message : "Unknown error")
    });
  }
});

events.post("/create", async (c) => {
  const { title, description, date, organizerId } = await c.req.json();

  if (!title || !date || !organizerId || !description) {
    c.status(400);
    return c.json({ 
      status: 400,
      message: "Title, date, and organizerId are required" 
    });
  }

  try {
    const response = await createEvent({
      id: ID.unique(),
      title,
      description,
      date: new Date(date),
      organizerId,
    });

    c.status(201);
    return c.json({
      status: 201,
      data: response
    });
  } catch (error: unknown) {
    console.error("Error creating event:", error instanceof Error ? error.message : error);
    c.status(500);
    return c.json({ 
      status: 500,
      message: "Error creating event: " + (error instanceof Error ? error.message : "Unknown error")
    });
  }
});

export default events;