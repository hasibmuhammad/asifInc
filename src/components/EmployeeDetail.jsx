import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { EditOutlined } from "@ant-design/icons";
import Modal from "./Modal";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employees/${id}`)
      .then((res) => {
        if (res?.data) {
          setInfo(res.data);
          setLoading(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="py-10 px-4 bg-blue-50 w-[300px] shadow-lg drop-shadow-lg rounded-lg">
            <code>
              Name: {info.firstname} {info.lastname}
            </code>
            <br />
            <code>Phone: {info.phone}</code>
            <br />
            <code>Email: {info.email}</code>
          </div>
          <div className="mt-5">
            <button
              onClick={() => document.getElementById("modal").showModal()}
              className="flex items-center gap-1 p-2 bg-red-400 rounded-lg text-white font-bold text-xs outline-none"
            >
              <EditOutlined />
              Edit
            </button>
          </div>
          <Modal info={info} />
        </>
      )}
    </>
  );
};

export default EmployeeDetail;
