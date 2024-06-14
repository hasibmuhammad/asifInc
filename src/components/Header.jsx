import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold tracking-widest uppercase ">
          ASIF Inc.
        </h1>
      </Link>
      <Link to={"/admin/dashboard"} className="text-blue-500 font-semibold">
        Dashboard
      </Link>
    </header>
  );
};

export default Header;
