import Image from "next/image";
import styles from "../../styles/variable.module.scss";
import Head from "next/head";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Router from "next/router";

function AdminLogin() {
  if (getCookie("admin_username") === process.env.NEXT_PUBLIC_ADMIN_USERNAME) {
    Router.push("/Admin");
  }

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  let submitForm = async (e) => {
    let res = await fetch("http://localhost:3000/api/admin_login", {
      method: "POST",
      body: JSON.stringify({
        username: login.username,
        password: login.password,
      }),
    });
    setLogin({ username: "", password: "" });
    const result = await res.json();
    if (result.status == "401") {
      setError(result.message);
    }
    if (result.status == "200") {
      Router.push("/Admin");
    }
  };

  function onLoginFieldChange(e) {
    const { name, value } = e.target;
    setLogin((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <div className={styles.loginPage}>
      <Head>
        <title>IMT-Blog</title>
        <meta name="description" content="Login Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <form>
        <div className={styles.image}>
          <Image
            priority
            src="/images/human.gif"
            width={200}
            height={200}
            alt="not found"
          />
        </div>
        <h3>Login As ADMIN</h3>
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          name="username"
          value={login.username}
          onChange={onLoginFieldChange}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          name="password"
          vvalue={login.password}
          onChange={onLoginFieldChange}
        />
        {error && <p style={{ color: "red" }}>Invalid Credentials !</p>}
        <div className={styles.formLoginBtn}>
          <button type="reset">Reset</button>
          <button type="button" onClick={submitForm}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
