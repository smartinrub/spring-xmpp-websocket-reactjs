import { connect } from 'react-redux';
import UsersBox from '../components/users_box/UsersBox';

export const UserBoxContainer = connect()(UsersBox);
