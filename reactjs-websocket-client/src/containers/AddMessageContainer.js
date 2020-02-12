import { connect } from 'react-redux';
import AddMessage from '../components/AddMessage';
import { addMessage } from '../store/actions/messagesListActions';
import { chat } from '../store/actions/chatActions';

const mapStateToProps = state => ({
  recipient: state.users.recipient
});

const mapDispatchToProps = dispatch => {
  return {
    addMessage: content => dispatch(addMessage(content)),
    chat: message => dispatch(chat(message))
  };
};

export const AddMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessage);
