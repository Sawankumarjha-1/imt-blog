import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import styles from "../../styles/variable.module.scss";
import Link from "next/link";

export default function Home({ data }) {
  return data.length ? (
    <Layout>
      <Head>
        <title>IMT-Blog</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.page}>
        <div
          className={(`${styles.columnDisplay}`, `${styles.paddingHorizontal}`)}
        >
          <h2 className={styles.heading}>
            Search Result <span>{data.length}</span>
          </h2>

          {data.map((element, index) => {
            return (
              <BlogList
                id={element._id}
                author={element.author}
                published={element.date}
                smallContent={element.smallContent}
                title={element.title}
                image={element.image}
                key={"individual-blogs" + index}
              />
            );
          })}
        </div>
      </main>
    </Layout>
  ) : (
    <Layout>
      <main style={{ padding: "0px 15%", paddingTop: "100px" }}>
        <h1>No Blog Found !</h1>
      </main>
    </Layout>
  );
}
const BlogList = ({ id, image, author, smallContent, title, published }) => {
  return (
    <div className={styles.individualBlogs}>
      <div className={styles.imageContainer}>
        <Image priority src={image} width={400} height={400} alt="not found" />
      </div>
      <div className={styles.blogcontent}>
        <h2>{title}</h2>
        <small>
          <span>Author : </span> {author}
          <b> | </b>
          <span>Published : </span>
          {published}
        </small>
        <p>{smallContent}</p>
        <Link href={"/blog/" + id}>Read More..</Link>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  // console.log(context.params.title);
  let res = await fetch(
    `http://localhost:3000/api/search/${context.params.title}`,
    {
      timeout: 10000,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();

  return {
    props: { data },
  };
}
