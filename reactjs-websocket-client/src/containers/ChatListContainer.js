import { connect } from 'react-redux';
import ChatList from '../components/ChatList';
import { selectRecipient } from '../store';

const mapStateToProps = state => ({
  usersList: state.users
});

const mapDispatchToProps = dispatch => {
  return {
    selectRecipient: recipient => dispatch(selectRecipient(recipient))
  };
};

const ChatListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);

export default ChatListContainer;
