import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { title },
  } = req;

  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "GET") {
    console.log(title);
    const data = await db
      .collection("posts")
      .find({ title: { $regex: title, $options: "i" } })
      .toArray();
    res.status(200).json(data);
  }
}
