import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/variable.module.scss";
import { useState } from "react";

import { hasCookie, getCookie } from "cookies-next";

function Signup() {
  if (hasCookie("email")) {
    window.location.href = "/";
  }
  const [successfull, setSuccessfull] = useState(false);
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  let submitForm = async (e) => {
    let res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        name: signup.name,
        username: signup.username,
        phone: signup.phone,
        password: signup.password,
      }),
    });
    setSignup({ name: "", username: "", phone: "", password: "" });
    const result = await res.json();
    // console.log(result);
    if (result.status == "401") {
      setError(result.message);
    }
    if (result.status == "200") {
      setSuccessfull(true);
    }
  };

  function onSignupFieldChange(e) {
    const { name, value } = e.target;
    setSignup((prev) => {
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

      {/*Set Successfull Pop up */}
      {successfull === true && (
        <div className={styles.signupPopUp}>
          <p>Signup Successfully...</p>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
          >
            OK
          </button>
        </div>
      )}
      <form>
        <div className={styles.image}>
          <Image
            priority
            src="/images/human.gif"
            width={200}
            height={200}
            alt="profile"
          />
        </div>
        <h3>Signup with IMT - Blog</h3>
        <input
          type="text"
          placeholder="Name"
          autoComplete="off"
          name="name"
          value={signup.name}
          onChange={onSignupFieldChange}
        />
        <input
          type="text"
          placeholder="Username/Email"
          autoComplete="off"
          name="username"
          value={signup.username}
          onChange={onSignupFieldChange}
        />
        <input
          type="text"
          placeholder="Phone no"
          autoComplete="off"
          name="phone"
          value={signup.phone}
          onChange={onSignupFieldChange}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          name="password"
          value={signup.password}
          onChange={onSignupFieldChange}
        />
        <div className={styles.formLoginBtn}>
          <button type="reset">Reset</button>
          <button type="button" onClick={submitForm}>
            Signup
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
