import React, { useState } from "react";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import { addContact } from "../../app/contactActions";

const AddPeopleBox = ({ dispatch }) => {
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
    dispatch(addContact(msg));
  };

  return (
    <div className="headind-srch">
      <div className="srch-bar">
        <div className="stylish-input-group">
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup controlId="contact">
              <FormControl
                type="text"
                className="search-bar"
                value={contact}
                placeholder="Type contact name"
                onChange={(e) => setContact(e.target.value)}
              />
            </FormGroup>
            <span className="input-group-addon">
              <Button disabled={!validateForm()} type="submit">
                Add
              </Button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPeopleBox;
