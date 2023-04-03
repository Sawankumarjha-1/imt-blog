import Image from "next/image";
import styles from "../styles/variable.module.scss";
import { RxAvatar, RxPlus } from "react-icons/rx";
import Link from "next/link";
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import Router, { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { hasCookie, deleteCookie } from "cookies-next";

export default function Navbar() {
  const [checkCookie, setCookie] = useState(false);
  const [search, setSearch] = useState("");
  const [avatarContainer, setAvatarContainer] = useState(false);
  const Router = useRouter();
  function onChangeFunction(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    setCookie(hasCookie("email"));
  }, []);
  return (
    <div className={styles.navigation}>
      <Link href="/">
        <Image src="/favicon.ico" width={50} height={50} />
      </Link>
      <div className={styles.displayRow}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by title...."
            value={search}
            onChange={onChangeFunction}
          />
          <Link href={search ? "/search/" + search : "/"}>
            <AiOutlineSearch className={styles.searchIocn} size={30} />
          </Link>
        </div>
        {checkCookie === false ? (
          <div>
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/signup" className={styles.signupBtn}>
              Signup
            </Link>
          </div>
        ) : (
          <div>
            <RxAvatar
              className={styles.navbarAvatar}
              size={40}
              onClick={() => {
                setAvatarContainer(true);
              }}
            />
            <div
              className={styles.avatarDiv}
              style={{ display: avatarContainer === true ? "block" : "none" }}
              onMouseLeave={() => {
                setAvatarContainer(false);
              }}
            >
              <span>
                <AiOutlineLogout size={30} className={styles.avatorNavIcon} />
                <p
                  onClick={() => {
                    deleteCookie("email");
                    Router.reload();
                  }}
                >
                  Logout
                </p>
              </span>
            </div>

            <Link href="/create">
              <RxPlus className={styles.navbarAvatar} size={40} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
