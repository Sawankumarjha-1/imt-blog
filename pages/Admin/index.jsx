import Image from "next/image";
import styles from "../../styles/variable.module.scss";

import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Router from "next/router";
import DashboardNav from "@/components/DashboardNav";

export default function AdminDashboard({ data }) {
  useEffect(() => {
    if (
      !(getCookie("admin_username") == process.env.NEXT_PUBLIC_ADMIN_USERNAME)
    ) {
      Router.push("/admin_login");
    }
  }, []);
  const [navDisplay, setNavDisplay] = useState(false);

  async function onDelete(id) {
    console.log(id);
    let res = await fetch(`http://localhost:3000/api/post_delete/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.status == "401") {
      alert("Something Wrong");
    }
    if (result.status == "200") {
      alert("Delete Successfully...");
      Router.reload();
    }
  }

  return (
    <main className={styles.dashboard}>
      {/*Set Successfull Pop up */}

      <DashboardNav />
      <div
        className={styles.dashboardMainDiv}
        style={{
          width: "100%",
          marginLeft: "0%",
        }}
      >
        <h1>
          All listed post <span>{data.length}</span>
        </h1>

        <div className={styles.listedAdminBlogs}>
          {data.map((element, index) => {
            return (
              <IndividualBlog
                key={"adminListedBlog" + index}
                source={element.image}
                title={element.title.substr(0, 50) + ".."}
                author={element.author}
                id={element._id}
                onDeleteFunc={onDelete}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
const IndividualBlog = ({ source, id, title, author, onDeleteFunc }) => {
  return (
    <div className={styles.individualAdminListedBlogs}>
      <Image src={source} alt="not found" width={200} height={200} />
      <div className={styles.adminDashboardBlogContent}>
        <p>{title}</p>
        <small>
          Author : <span>{author}</span>
        </small>
        <div className={styles.optionsBtn}>
          <AiFillDelete
            size={40}
            className={styles.deleteBlogIcon}
            onClick={() => {
              onDeleteFunc(id);
            }}
          />
        </div>
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
