import React from "react";
import { useSelector } from "react-redux";
import AddPeopleBoxContainer from "../../containers/AddContactBoxContainer";
import { ContactContainer } from "../../containers/ContactContainer";
import { selectContacts } from "../../features/contacts/contactsSlice";

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
