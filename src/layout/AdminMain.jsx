import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminMain = () => {
  return (
    <div className="px-10 flex flex-col md:flex-row gap-0 md:gap-10">
      <div className="mt-10">
        <Sidebar />
      </div>
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminMain;
