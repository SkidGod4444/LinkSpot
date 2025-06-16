/* eslint-disable import/no-unresolved */
import { createUser, getUsers } from "@/lib/actions";
import { ID } from "appwrite";
import { Hono } from "hono";

const users = new Hono();

users.get("/", async (c) => {
  try {
    const response = await getUsers();

    if (!response || response.length === 0) {
      console.warn("No users found");
      c.status(404);
      return c.json({ 
        status: 404,
        message: "No users found" 
      });
    }

    c.status(200);
    return c.json({
      status: 200,
      data: response
    });
  } catch (error: unknown) {
    console.error("Error fetching users:", error instanceof Error ? error.message : error);
    c.status(500);
    return c.json({ 
      status: 500,
      message: "Error fetching users: " + (error instanceof Error ? error.message : "Unknown error")
    });
  }
});

users.post("/create", async (c) => {
  const { name, email, username } = await c.req.json();

  if (!name || !email) {
    c.status(400);
    return c.json({ 
      status: 400,
      message: "Name and email are required" 
    });
  }

  try {
    const response = await createUser({
     id: ID.unique(),
      name,
      email,
      username,
    });

    c.status(201);
    return c.json({
      status: 201,
      data: response
    });
  } catch (error: unknown) {
    console.error("Error creating user:", error instanceof Error ? error.message : error);
    c.status(500);
    return c.json({ 
      status: 500,
      message: "Error creating user: " + (error instanceof Error ? error.message : "Unknown error")
    });
  }
});

export default users;