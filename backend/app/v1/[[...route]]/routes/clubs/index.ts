/* eslint-disable import/no-unresolved */
import { createClub, getClubs } from "@/lib/actions";
import { ID } from "appwrite";
import { Hono } from "hono";

const clubs = new Hono();

clubs.get("/", async (c) => {
  try {
    const response = await getClubs();

    if (!response || response.length === 0) {
      console.warn("No clubs found");
      c.status(404);
      return c.json({ 
        status: 404,
        message: "No clubs found" 
      });
    }

    c.status(200);
    return c.json({
      status: 200,
      data: response
    });
  } catch (error : unknown) {
    console.error("Error fetching clubs:", error instanceof Error ? error.message : error);
    c.status(500);
    return c.json({ 
      status: 500,
      message: "Error fetching clubs: " + (error instanceof Error ? error.message : "Unknown error")
    });
  }
});

clubs.post("/create", async (c) => {
    const { name, description } = await c.req.json();
    
    if (!name || !description) {
        c.status(400);
        return c.json({ 
        status: 400,
        message: "Name and description are required" 
        });
    }
    
    try {
        const response = await createClub({
        id: ID.unique(),
        name,
        description
        });

        c.status(201);
        return c.json({
        status: 201,
        data: response
        });
    } catch (error: unknown) {
        console.error("Error creating club:", error instanceof Error ? error.message : error);
        c.status(500);
        return c.json({ 
        status: 500,
        message: "Error creating club: " + (error instanceof Error ? error.message : "Unknown error")
        });
    }
    }
);

export default clubs;