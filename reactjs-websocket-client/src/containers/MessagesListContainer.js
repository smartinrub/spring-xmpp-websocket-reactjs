import { connect } from 'react-redux';
import MessagesList from '../components/MessageList';

export const MessagesListContainer = connect(
  state => ({
    messages: state.messages
  }),
  {}
)(MessagesList);
