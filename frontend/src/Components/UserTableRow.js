import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const UserTableRow = (props) => {
  const { _id, name, email, amount } = props.obj;

  // Delete user
  const deleteUser = () => {
    console.log(`Attempting to delete user with ID: ${_id}`);
    axios
      .delete(`http://localhost:4000/users/delete-user/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully deleted");
          window.location.reload();
        }
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  const [user, setUser] = useState([]);
  const [formValues, setFormValues] = useState({
    name1: name,
    name2: "",
    amount: "",
  });

  // Fetch all users except the sender
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/`)
      .then(({ data }) => {
        const filteredUsers = data.filter((user) => user.name !== name);
        setUser(filteredUsers);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [name]);

  // Handle user selection
  const selectData = (event) => {
    const selectedName = event.target.value;
    setFormValues((prev) => ({
      ...prev,
      name2: selectedName,
    }));
  };

  // Handle amount input
  const selectAmount = (event) => {
    const enteredAmount = event.target.value;
    if (Number(enteredAmount) > Number(amount)) {
      alert("Insufficient balance!");
    } else {
      setFormValues((prev) => ({
        ...prev,
        amount: enteredAmount,
      }));
    }
  };

  // Transaction Submission
  const onSubmit = () => {
    const { name2, amount } = formValues;

    if (name2 === "" || amount === "") {
      alert("Please fill in all the fields!");
    } else if (name2 === name) {
      alert("Sender and receiver cannot be the same!");
    } else {
      axios
        .post(`http://localhost:4000/users/create-transaction`, formValues)
        .then((res) => {
          if (res.status === 200) {
            alert("Transaction Successful!");
            window.location.reload();
          }
        })
        .catch((err) => alert("Error processing transaction:", err));
      handleClose();
    }
  };

  // Modal control
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{amount}</td>
      <td>
        <Button variant="primary" size="sm" onClick={handleShow}>
          Transfer
        </Button>

        {/* Modal for Transaction */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Transaction Screen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-2">Transfer to:</div>
            <Form.Select name="name2" onChange={selectData} required>
              <option value="">--none--</option>
              {user.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>

            <form className="mt-3">
              <div className="mb-2">
                <label>Amount:</label>
              </div>
              <input
                type="number"
                name="amount"
                className="transaction-amount"
                onChange={selectAmount}
                required
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onSubmit}>
              Transfer
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          onClick={deleteUser}
          size="sm"
          variant="danger"
          className="delete-button"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UserTableRow;
