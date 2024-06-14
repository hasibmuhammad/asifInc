import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Loader from "./Loader";

const Header = () => {
  const { loading, user, signout } = useAuthContext();
  return (
    <header className="flex justify-between">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold tracking-widest uppercase ">
          ASIF Inc.
        </h1>
      </Link>
      <div>
        {/* {loading && <Loader />} */}
        {!loading && !user && (
          <Link to={"/signin"}>
            <button className="px-4 py-2 outline rounded font-bold">
              Sign In
            </button>
          </Link>
        )}
        {user && !loading && (
          <button
            onClick={() => signout()}
            className="px-4 py-2 outline rounded font-bold"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
