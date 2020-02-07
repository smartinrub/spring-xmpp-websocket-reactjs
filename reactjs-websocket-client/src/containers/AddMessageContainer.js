import { connect } from 'react-redux';
import AddMessage from '../components/AddMessage';
import { messageSent } from '../store/actions/messagesListActions';
import { newMessage } from '../store/actions/chatActions';

const mapDispatchToProps = dispatch => {
  return {
    messageSent: content => dispatch(messageSent(content)),
    newMessage: msg => dispatch(newMessage(msg))
  };
};

export const AddMessageContainer = connect(
  null,
  mapDispatchToProps
)(AddMessage);
