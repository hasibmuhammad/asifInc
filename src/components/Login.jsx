import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Login = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password)
      return setError("Please provide email and password!");

    // Login
    signIn(email, password)
      .then((res) => {
        if (res.user) {
          navigate(location.state ?? "/admin/dashboard");
        }
      })
      .catch((error) => {
        if (error) {
          setError("Email or Password is wrong!");
          return navigate("/signin");
        }
      });
  };

  useEffect(() => {
    if (user && !loading) {
      navigate("/admin/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading && !error)
    return (
      <div className="flex flex-col justify-center items-center min-h-96">
        <Loader />
      </div>
    );

  return (
    <div className="flex items-center flex-col justify-center min-h-screen">
      <h1 className="text-3xl font-semibold uppercase tracking-widest">
        Sign In
      </h1>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="w-full md:w-2/5 space-y-3 px-10 md:px-0"
      >
        <div>
          <label>Email</label>
          <br />
          <input
            className="border border-blue-200 w-full px-4 py-2 rounded-lg outline-none"
            type="email"
            name="email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            className="border border-blue-200 w-full px-4 py-2 rounded-lg outline-none"
            type="password"
            name="password"
            required
          />
        </div>

        {error && <p className="text-red-400">{error}</p>}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 font-bold text-white rounded w-full"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
