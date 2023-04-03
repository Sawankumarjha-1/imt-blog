import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { method, params } = req;
  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "GET") {
    const data = await db
      .collection("posts")
      .find()
      .sort({ date: -1 })
      .toArray();
    res.status(200).send(data);
  }

  if (method === "POST") {
    let bodyObject = req.body;
    let myPost = await db.collection("posts").insertOne(bodyObject);
    res.status(200).send("Submit Successfully...");
  }
}
