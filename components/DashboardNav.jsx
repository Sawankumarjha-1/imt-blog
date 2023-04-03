import styles from "../styles/variable.module.scss";

import { deleteCookie } from "cookies-next";
import { useState } from "react";
import {
  AiFillCloseCircle,
  AiFillDelete,
  AiOutlineBars,
  AiOutlineLogout,
} from "react-icons/ai";
export default function dashboardNav() {
  const [navDisplay, setNavDisplay] = useState(false);
  return (
    <div>
      <AiOutlineBars
        size={80}
        className={styles.bars}
        onClick={() => {
          setNavDisplay(true);
        }}
      />
      <nav
        className={styles.adminNav}
        style={{ display: navDisplay === true ? "block" : "none" }}
      >
        <h3>
          IMT-BLOG DASHBOARD
          <AiFillCloseCircle
            size={50}
            className={styles.close}
            onClick={() => {
              setNavDisplay(false);
            }}
          />
        </h3>

        <span
          onClick={() => {
            window.location.href = "/admin_create";
          }}
        >
          <AiOutlineLogout size={40} />
          <p>Create Blog</p>
        </span>
        <span
          onClick={() => {
            deleteCookie("admin_username");
            window.location.href = "/admin_login";
          }}
        >
          <AiOutlineLogout size={40} />
          <p>Logout</p>
        </span>
      </nav>
    </div>
  );
}
