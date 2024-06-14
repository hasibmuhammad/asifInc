import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Link
        to={"/admin/dashboard"}
        className="font-semibold outline rounded px-8 py-4 "
      >
        Go To Dashboard
      </Link>
    </div>
  );
};

export default Home;
