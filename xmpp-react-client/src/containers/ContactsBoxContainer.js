import { connect } from 'react-redux';
import ContactsBox from '../components/contacts_box/ContactsBox';

export const ContactsBoxContainer = connect()(ContactsBox);
