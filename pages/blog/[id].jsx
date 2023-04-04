import Link from "next/link";
import Layout from "@/components/layout";
import styles from "../../styles/variable.module.scss";
import Image from "next/image";
import Head from "next/head";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";
import Router from "next/navigation";

const defaultOptions = {
  allowedTags: ["b", "i", "em", "strong", "a"],
  allowedAttributes: {
    a: ["href"],
  },
  allowedIframeHostnames: ["www.youtube.com"],
};

const sanitize = (dirty, options) => ({
  __html: sanitizeHtml(dirty),
});

export default function Posts({ data, commentData }) {
  const defaultOptions = {
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href"],
    },
    allowedIframeHostnames: ["www.youtube.com"],
  };

  const [comment, setComment] = useState({ email: "", comment: "" });

  let submitForm = async (e) => {
    let res = await fetch("http://localhost:3000/api/cpost", {
      method: "POST",
      body: JSON.stringify({
        blog_id: data._id,
        email: comment.email,
        comment: comment.comment,
      }),
    });
    // res = await res.json();
    setComment({ email: "", comment: "" });
    Router.refresh();
  };
  function onCommentChange(e) {
    const { name, value } = e.target;
    setComment((prev) => {
      return { ...prev, [name]: value };
    });
  }

  return (
    <Layout>
      <Head>
        <title>IMT-Blog</title>
        <meta name="description" content="Readmore Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.page}>
        <div className={styles.readmorePage}>
          <div className={styles.readmorePageImage}>
            <Image src={data.image} width={500} height={500} alt="not found" />
          </div>
          <div className={styles.readmorePagecontent}>
            <h1>{data.title}</h1>
            <small>
              <span>Author : </span> {data.author}
              <b> | </b>
              <span>Published : </span>
              {data.date}
            </small>
            <SanitizeHTML html={data.bigContent} />
          </div>
        </div>

        <form className={styles.commentContainer}>
          <input
            type="text"
            placeholder="Email Id"
            name="email"
            value={comment.email}
            onChange={onCommentChange}
            required
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Comments..."
            name="comment"
            value={comment.comment}
            onChange={onCommentChange}
            required
            autoComplete="off"
          />
          <button onClick={submitForm} type="button">
            <AiOutlineSend size={30} className={styles.sendIcon} />
          </button>
        </form>

        <div className={styles.listedComment}>
          {commentData &&
            commentData.map((element, index) => {
              return (
                <div
                  className={styles.individualListedComments}
                  key={"individualBlogComment" + index + data._id}
                >
                  <div className={styles.listedCommentContent}>
                    <b>{element.email}</b>
                    <smal>{element.comment}</smal>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </Layout>
  );
}

const SanitizeHTML = ({ html, options }) => (
  <div dangerouslySetInnerHTML={sanitize(html, options)} />
);

export async function getServerSideProps(context) {
  let res = await fetch(
    `http://localhost:3000/api/particular/${context.params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  let res2 = await fetch(
    `http://localhost:3000/api/comment/${context.params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let commentData = await res2.json();

  return {
    props: { data, commentData },
  };
}
