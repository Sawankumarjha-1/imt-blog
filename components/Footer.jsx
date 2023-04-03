import { AiFillCopyrightCircle } from "react-icons/ai";
export default function Footer() {
  return (
    <footer className="">
      <AiFillCopyrightCircle size={20} />
      <p>
        Copyright {new Date().getFullYear()}All Right Reserved @Design by Sawan
        Kumar Jha
      </p>
    </footer>
  );
}
