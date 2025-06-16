import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("6816bfb100026bf628c7"); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

// IDs
const users_collection_id = '68500af0000d152a6d7b';
const clubs_collection_id = '684fff00002268a24820';
const events_collection_id = '685019620034300a65a9';

export { account, databases, users_collection_id, clubs_collection_id, events_collection_id };
