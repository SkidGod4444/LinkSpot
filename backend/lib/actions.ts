import { ID } from "appwrite";
import { clubs_collection_id, databases, events_collection_id, users_collection_id } from "./appwrite";

const db_id = process.env.APPWRITE_DB_ID!;
console.log("Database ID:", db_id);

// CLUBS
async function createClub({id, name,description}: ClubT) {
    try {
        const result = await databases.createDocument(
            db_id, // databaseId
            clubs_collection_id, // collectionId
            ID.unique(), // documentId
            {
                id,
                name,
                description,
            }, // data
            ['read("any")'] // permissions (optional)
        );
        console.log("Club created successfully:", result);
        return result;
    } catch (error) {
        console.error("Error creating club:", error);
        throw error;
        
    }
}

async function getClubs() {
    try {
        const response = await databases.listDocuments(
            db_id, // Database ID
            clubs_collection_id // Collection ID for clubs
        );

        if (!response.documents || response.documents.length === 0) {
            throw new Error("No clubs found");
        }

        return response.documents;
    } catch (error) {
        console.error("Error fetching clubs:", error);
        throw error;
    }
}

// USERS
async function createUser({id, name, username, email}: UserT) {
    try {
        const result = await databases.createDocument(
            db_id, // databaseId
            users_collection_id, // collectionId
            ID.unique(), // documentId
            {
                id,
                name,
                username,
                email,
            }, // data
            ['read("any")'] // permissions (optional)
        );
        console.log("Club created successfully:", result);
        return result;
    } catch (error) {
        console.error("Error creating club:", error);
        throw error;
        
    }
}

async function getUsers() {
    try {
        const response = await databases.listDocuments(
            db_id, // Database ID
            users_collection_id // Collection ID for users
        );

        if (!response.documents || response.documents.length === 0) {
            throw new Error("No users found");
        }

        return response.documents;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

// EVENTS

async function createEvent({id, title, description, date, organizerId}:EventT) {
    try {
        const result = await databases.createDocument(
            db_id, // databaseId
            events_collection_id, // collectionId for events
            ID.unique(), // documentId
            {
                id,
                title,
                description,
                date: date.toISOString(), // Ensure date is in ISO format
                organizerId,
            }, // data
            ['read("any")'] // permissions (optional)
        );
        console.log("Event created successfully:", result);
        return result;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
        
    }
}

async function getEvents() {
    try {
        const response = await databases.listDocuments(
            db_id, // Database ID
            events_collection_id // Collection ID for events
        );

        if (!response.documents || response.documents.length === 0) {
            throw new Error("No events found");
        }

        return response.documents;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}

export {createClub, createUser, createEvent, getClubs, getUsers, getEvents};