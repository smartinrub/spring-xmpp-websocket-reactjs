import React from "react";
import { useSelector } from "react-redux";
import AddPeopleBoxContainer from "./AddContactBoxContainer";
import { ContactContainer } from "./ContactContainer";
import { selectContacts } from "./contactsSlice";

const ContactsBox = () => {
  const contacts = useSelector(selectContacts);

  return (
    <div className="inbox-people">
      <AddPeopleBoxContainer />
      <div className="inbox-chat">
        {contacts.map((name, index) => (
          <ContactContainer eventKey={index} name={name} />
        ))}
      </div>
    </div>
  );
};

export default ContactsBox;
