import { connect } from 'react-redux';
import Chat from '../components/Chat';
import { wsConnect, wsDisconnect } from '../store';

const mapStateToProps = state => ({
  isAuthenticated: state.loginInfo.isAuthenticated,
  noUser: state.loginInfo.noUser
});

const mapDispatchToProps = dispatch => {
  return {
    wsConnect: username => dispatch(wsConnect(username)),
    wsDisconnect: username => dispatch(wsDisconnect(username))
  };
};

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default ChatContainer;
