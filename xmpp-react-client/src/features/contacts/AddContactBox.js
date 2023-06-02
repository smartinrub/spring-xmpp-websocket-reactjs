import React, { useState } from "react";
import { addContact } from "./contactActions";

const AddContactBox = ({ dispatch }) => {
  const [contact, setContact] = useState("");

  const validateForm = () => {
    return contact.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = {
      to: contact,
      messageType: "ADD_CONTACT",
    };
    setContact("");
    dispatch(addContact(msg));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="input-group">
        <div className="input-group-prepend">
          <button
            disabled={!validateForm()}
            className="input-group-text btn btn-outline-info"
            type="submit"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
    </form>
  );
};

export default AddContactBox;
