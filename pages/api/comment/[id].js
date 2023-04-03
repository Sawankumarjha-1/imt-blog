import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "GET") {
    // console.log(id);
    const data = await db
      .collection("comments")
      .find({ blog_id: id })
      .toArray();
    res.status(200).send(data);
  }
}
