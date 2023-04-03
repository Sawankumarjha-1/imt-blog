import clientPromise from "../../lib/mongodb";
import { setCookie } from "cookies-next";
export default async function handler(req, res) {
  const { method, params } = req;
  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "POST") {
    let bodyObject = JSON.parse(req.body);
    // console.log(req.body);
    let checkIsUserAlreadyExist = await db
      .collection("users")
      .find({ username: bodyObject.username })
      .toArray();
    if (checkIsUserAlreadyExist.length) {
      return res.json({ status: "401", message: "Username already exist !" });
    }
    let myPost = await db.collection("users").insertOne(bodyObject);
    setCookie("email", bodyObject.username, {
      req,
      res,
      maxAge: 60 * 60 * 24,
      sameSite: true,
      path: "/",
    });
    res.json({ status: "200", message: "Signup Successfully..." });
  }
}
