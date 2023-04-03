import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { isValidObjectId } from "mongoose";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "GET") {
    if (!isValidObjectId(id)) {
      return res.status(401).send("Inavlid request");
    }
    const data = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });
    res.status(200).send(data);
  }
}
