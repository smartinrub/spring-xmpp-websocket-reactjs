import { connect } from 'react-redux';
import ChatList from '../components/ChatList';

const mapStateToProps = state => ({
  usersList: state.users
});

const ChatListContainer = connect(mapStateToProps)(ChatList);

export default ChatListContainer;
