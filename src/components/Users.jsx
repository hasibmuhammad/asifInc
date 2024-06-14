import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router-dom";
const { Column } = Table;

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/employees").then((res) => {
      if (res?.data) {
        setTableData(res.data);
        setLoading(false);
      }
    });
  }, []);

  // handle block
  const handleBlock = (id) => {
    console.log(id);
  };
  // handle delete
  const handleDelete = (id) => {
    console.log(id);
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
                  Block
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
    </>
  );
};
export default Users;
