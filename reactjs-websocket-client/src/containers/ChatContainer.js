import { connect } from 'react-redux';
import Chat from '../components/Chat';
import { wsConnect } from '../store';

const mapDispatchToProps = dispatch => {
  return {
    wsConnect: username => dispatch(wsConnect(username))
  };
};

const ChatContainer = connect(null, mapDispatchToProps)(Chat);

export default ChatContainer;
