import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ info }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // toast
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();

    const form = e.target;

    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const phone = form.phone.value;

    if (!firstname || !lastname || !phone) {
      return setError("Please provide all the information!");
    }
    const updateUser = { firstname, lastname, phone };

    // employee creation
    axios
      .patch(`http://localhost:3000/employees/${info._id}`, updateUser)
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          notifySuccess("Employee Updated Succussfully!");
          setTimeout(() => {
            document.getElementById("close").click();
            navigate("/admin/employees");
          }, 2000);
        }
        if (res.data?.modifiedCount === 0) {
          notifyError("Nothing to update!");
          setTimeout(() => {
            document.getElementById("close").click();
            navigate("/admin/employees");
          }, 2000);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <dialog
      className="w-full md:w-2/5 px-10 pb-20 rounded backdrop:bg-black backdrop:opacity-70"
      id="modal"
    >
      <form method="dialog" className="flex justify-end">
        <button
          id="close"
          className="text-3xl font-bold text-red-500 outline-none"
        >
          &times;
        </button>
      </form>
      <div>
        <>
          <h1 className="text-3xl font-bold">Update Employee</h1>
          <br />
          <hr />
          <br />
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="w-full space-y-3"
          >
            <div>
              <label>Firstname</label>
              <br />
              <input
                className="border border-blue-200 w-full px-4 py-2 rounded-lg outline-none"
                type="text"
                name="firstname"
                defaultValue={info.firstname}
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
                defaultValue={info.lastname}
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
                defaultValue={info.phone}
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
                defaultValue={info.email}
                required
                readOnly
                disabled
              />
            </div>
            {error && <p className="text-red-400">{error}</p>}
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 font-bold text-white rounded w-full"
              >
                Update
              </button>
            </div>
          </form>
        </>
      </div>
      <ToastContainer />
    </dialog>
  );
};

export default Modal;
