import { Client, Account } from "react-native-appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("6816bfb100026bf628c7");                 // Your project ID

const account = new Account(client);

const logoutUser = async () => {
    try {
      await account.deleteSession('current')
    } catch (error) {
      console.error(error)
    }
  }

const getUser = async () => {
    try {
      return await account.get()
    } catch (error) {
      console.error(error)
    }
  }

export { account, logoutUser, getUser };