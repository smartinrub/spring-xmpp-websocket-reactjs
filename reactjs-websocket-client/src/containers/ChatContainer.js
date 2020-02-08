import { connect } from 'react-redux';
import Chat from '../components/Chat';
import { wsConnect } from '../store';

const mapStateToProps = state => ({
  isAuthenticated: state.loginInfo.isAuthenticated,
  noUser: state.loginInfo.noUser
});

const mapDispatchToProps = dispatch => {
  return {
    wsConnect: username => dispatch(wsConnect(username))
  };
};

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default ChatContainer;
