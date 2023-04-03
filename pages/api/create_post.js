import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "POST") {
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject);
    let myPost = await db.collection("posts").insertOne(bodyObject);
    res.json({ status: "200", message: "Blog Submitted Successfully....." });
  }
}
