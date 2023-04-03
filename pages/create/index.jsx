import Head from "next/head";

import Layout from "@/components/layout";
import styles from "../../styles/variable.module.scss";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { useEffect, useState } from "react";
import { hasCookie } from "cookies-next";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function Create() {
  useEffect(() => {
    if (hasCookie("email") === false) {
      window.location.href = "/";
    }
  }, []);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [uploadDisable, setUploadDisable] = useState(false);
  const [content, setContent] = useState("");
  const [data, setData] = useState({
    title: "",
    author: "",
    smallContent: "",
    date: "",
    image: "",
  });

  //Upload to client
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      setData((prev) => {
        return { ...prev, image: "/images/" + event.target.files[0].name };
      });
    }
  };
  //Upload to Server
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    if (response.status === "200") {
      alert("Image Upload Successfully....");
    }
  };

  function onFieldChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleChange(c) {
    setContent(c);
  }

  //Submit All Data

  let submitForm = async (e) => {
    if (
      data.title === "" ||
      data.author === "" ||
      data.smallContent === "" ||
      data.bigContent === "" ||
      data.date === "" ||
      data.image === ""
    ) {
      alert("Please Fill all the details ....");
    } else {
      let res = await fetch("http://localhost:3000/api/create_post", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          author: data.author,
          smallContent: data.smallContent,
          bigContent: content,
          date: data.date,
          image: data.image,
        }),
      });

      const result = await res.json();
      if (result.status == "401") {
        alert("Something Wents Wrong ..");
      }
      if (result.status == "200") {
        alert("Blog Submit Successfully");
        window.location.href = "/create";
      }
    }
  };
  return (
    <Layout>
      <Head>
        <title>IMT-Blog</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.page}>
        <div className={styles.uploadImage}>
          <div>
            <img src={createObjectURL} width="200" height="200" />

            <div className={styles.uploadBtn}>
              <input type="file" name="myImage" onChange={uploadToClient} />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={uploadToServer}
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        <form className={styles.createPost}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={data.title}
            onChange={onFieldChange}
            required
          />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={data.author}
            onChange={onFieldChange}
            required
          />
          <input
            type="datetime-local"
            name="date"
            value={data.date}
            onChange={onFieldChange}
            required
          />
          <textarea
            placeholder="Small Content (150 words)"
            name="smallContent"
            value={data.smallContent}
            onChange={onFieldChange}
            required
          ></textarea>

          <SunEditor
            name="bigContent"
            defaultValue=""
            width="500px"
            height="200px"
            placeholder="Describe Blog Content..."
            onChange={handleChange}
            required
          />
          <div className={styles.createPostBtn}>
            <button type="reset">Reset</button>
            <button type="button" onClick={submitForm}>
              Submit
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
}
