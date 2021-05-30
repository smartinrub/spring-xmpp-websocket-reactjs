import React from "react";
import { useSelector } from "react-redux";
import AddPeopleBoxContainer from "../../containers/AddContactBoxContainer";
import { selectContacts } from "../../features/contacts/contactsSlice";
import Contact from "../contact/Contact";

const ContactsBox = () => {
  const contacts = useSelector(selectContacts);

  return (
    <div className="inbox-people">
      <AddPeopleBoxContainer />
      <div className="inbox-chat">
        {contacts.map((name, index) => (
          <Contact eventKey={index} name={name} />
        ))}
      </div>
    </div>
  );
};

export default ContactsBox;
