import React from "react";
import { useSelector } from "react-redux";
import AddPeopleBoxContainer from "./AddContactBoxContainer";
import { ContactContainer } from "./ContactContainer";
import { selectContacts } from "./contactsSlice";

const ContactsBox = () => {
  const contacts = useSelector(selectContacts);

  return (
    <div id="plist" className="people-list">
      <AddPeopleBoxContainer />
      <ul className="list-unstyled chat-list mt-2 mb-0">
        {contacts.map((name, index) => (
          <ContactContainer key={index} name={name} />
        ))}
      </ul>
    </div>
  );
};

export default ContactsBox;
