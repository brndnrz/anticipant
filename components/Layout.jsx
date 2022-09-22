import Nav from "../components/Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="pageWrapper">
        <Nav />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
