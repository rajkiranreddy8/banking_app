import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import UserTableRow from "./UserTableRow";

const UserList = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const DataTable = () => {
    try {
      return user.map((res, i) => {
        return <UserTableRow obj={res} key={i} />;
      });
    } catch (error) {
      console.error("Error in DataTable:", error);
      return <tr><td colSpan="4">Error loading user data.</td></tr>;
    }
  };

  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default UserList;
