import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import Loader from "./Loader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const { Column } = Table;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Employees = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get("https://asif-inc-backend.vercel.app/employees").then((res) => {
      if (res?.data) {
        setTableData(res.data);
        setLoading(false);
      }
    });
  }, []);

  // toast
  const success = (message) => toast.success(message);
  const failed = (message) => toast.error(message);

  // handle block / unblock
  const handleBlock = (id) => {
    axios
      .patch(`https://asif-inc-backend.vercel.app/block/${id}`)
      .then((res) => {
        if (res?.data?.result?.modifiedCount > 0) {
          const updatedEmployee = res?.data?.employee;

          if (!updatedEmployee.blocked === true) {
            failed(`You've blocked ${updatedEmployee.firstname} successfully!`);
          } else {
            success(
              `You've unblocked ${updatedEmployee.firstname} successfully!`
            );
          }

          setTableData((prev) =>
            prev.map((employee) => {
              return employee._id === id
                ? { ...updatedEmployee, blocked: !updatedEmployee.blocked }
                : employee;
            })
          );
        }
      });
  };
  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://asif-inc-backend.vercel.app/delete/${id}`)
          .then((res) => {
            if (res?.data?.deletedCount > 0) {
              success("Employee deleted successfully!");

              setTableData((prev) =>
                prev.filter((employee) => employee._id !== id)
              );
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };
  return (
    <>
      <h1 className="text-3xl font-bold">Employees</h1>
      <br />
      <hr />
      <br />
      {loading && <Loader />}
      {!loading && (
        <Table dataSource={tableData}>
          <Column title="First Name" dataIndex="firstname" key="firstname" />
          <Column title="Last Name" dataIndex="lastname" key="lastName" />
          <Column title="Phone No." dataIndex="phone" key="phone" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Link to={`/admin/employees/${record._id}`}>
                  <button className="font-semibold text-blue-400">
                    Details
                  </button>
                </Link>
                <button
                  onClick={() => handleBlock(record._id)}
                  className="font-semibold text-red-400"
                >
                  {record.blocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="font-semibold text-red-400"
                >
                  Delete
                </button>
              </Space>
            )}
          />
        </Table>
      )}
      <ToastContainer />
    </>
  );
};
export default Employees;
