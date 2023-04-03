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

  if (method === "DELETE") {
    if (!isValidObjectId(id)) {
      return res.json({ status: "401", message: "Invalid Request" });
    }
    const data = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(id) });
    res.json({ status: "200", message: "Delete Successfully" });
  }
}
