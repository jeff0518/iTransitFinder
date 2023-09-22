import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://cycivs07:VYnBpRCPgxJDdu89@cluster0.3jbaguo.mongodb.net/ubike?retryWrites=true&w=majority"
  );

  return client;
}
