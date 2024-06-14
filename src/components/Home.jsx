import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Loader from "./Loader";

const Home = () => {
  const { loading, user, signout } = useAuthContext();
  return (
    <div className="min-h-screen flex justify-center items-center">
      {loading && <Loader />}
      {!loading && !user && (
        <Link to={"/signin"}>
          <button className="px-16 py-4 outline rounded font-bold">
            Sign In
          </button>
        </Link>
      )}
      {user && !loading && (
        <button
          onClick={() => signout()}
          className="px-16 py-4 outline rounded font-bold"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Home;
