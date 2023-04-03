import clientPromise from "../../lib/mongodb";
import { setCookie } from "cookies-next";
export default async function handler(req, res) {
  const { method, params } = req;
  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "POST") {
    let bodyObject = JSON.parse(req.body);
    // console.log(bodyObject);
    let checkIsUserAlreadyExist = await db
      .collection("users")
      .find({ username: bodyObject.username, password: bodyObject.password })
      .toArray();
    if (checkIsUserAlreadyExist.length) {
      setCookie("email", bodyObject.username, {
        req,
        res,
        maxAge: 60 * 60 * 24,
        sameSite: true,
        path: "/",
      });
      return res.json({ status: "200", message: "Login Successfully..." });
    } else {
      res.json({ status: "401", message: "Invalid Credentials !" });
    }
  }
}
