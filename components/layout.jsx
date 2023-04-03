import Navbar from "./Navbar";
import Footer from "./Footer";
import layoutCss from "../styles/layout.module.scss";
export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
