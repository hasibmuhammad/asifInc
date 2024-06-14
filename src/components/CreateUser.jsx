import axios from "axios";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

const CreateUser = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;

    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const phone = form.phone.value;
    const email = form.email.value;

    if (!firstname || !lastname || !phone || !email) {
      return setError("Please provide all the information!");
    }
    const newUser = { firstname, lastname, phone, email };

    axios
      .post(
        `http://localhost:3000/create-employee?email=${user?.email}`,
        newUser
      )
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <h1 className="text-3xl font-bold">Create an user</h1>
      <br />
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="w-full md:w-[50vw] space-y-3"
      >
        <div>
          <label>Firstname</label>
          <br />
          <input
            className="border border-blue-200 w-full px-4 py-2 rounded-lg outline-none"
            type="text"
            name="firstname"
            required
          />
        </div>
        <div>
          <label>Lastname</label>
          <br />
          <input
            className="border border-blue-200 w-full px-4 py-2 rounded-lg outline-none"
            type="text"
            name="lastname"
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <br />
          <input
            className="border border-blue-200 w-full px-4 py-2 rounded-lg outline-none"
            type="number"
            name="phone"
            required
          />
        </div>
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
        {error && <p className="text-red-400">{error}</p>}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 font-bold text-white rounded w-full"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};
export default CreateUser;
