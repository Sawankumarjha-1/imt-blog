import clientPromise from "../../lib/mongodb";
import { setCookie } from "cookies-next";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method, params } = req;
  const client = await clientPromise;
  const db = client.db("IMT-BLOG");

  if (method === "POST") {
    let bodyObject = JSON.parse(req.body);
    let checkIsUserExistance = await db
      .collection("users")
      .find({ username: bodyObject.username })
      .toArray();
    if (checkIsUserExistance.length) {
      const result = bcrypt.compareSync(
        bodyObject.password,
        checkIsUserExistance[0].password
      );
      if (result === true) {
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
    } else {
      res.json({ status: "401", message: "Invalid Credentials !" });
    }
  }
}
