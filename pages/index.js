import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import styles from "../styles/variable.module.scss";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { paginate } from "../components/paginated";
import Navbar from "@/components/Navbar";
// import styles from "@/styles/Home.module.css";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedPosts = paginate(data, currentPage, pageSize);
  return (
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
            Listed Blogs <span>({data.length})</span>
          </h2>

          {paginatedPosts.map((element, index) => {
            return (
              <BlogList
                id={element._id}
                author={element.author}
                published={element.date}
                smallContent={element.smallContent.substr(0, 200) + "..."}
                title={element.title}
                image={element.image}
                key={"individual-blogs" + index}
              />
            );
          })}
          <Pagination
            items={data.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
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
  let res = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();

  return {
    props: { data },
  };
}
