import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { method, params } = req;
  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "POST") {
    // console.log(req.body);
    let bodyObject = JSON.parse(req.body);
    let myPost = await db.collection("comments").insertOne(bodyObject);
    res.status(200).send("Submit Successfully...");
  }
}
