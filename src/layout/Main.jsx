import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="flex justify-between flex-col min-h-screen">
      <div className="my-5">
        <div className="px-10">
          <Header />
        </div>
        <Outlet />
      </div>
      <div className="px-10">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
