import { connect } from "react-redux";
import ChatBox from "../components/chat_box/ChatBox";

export const ChatBoxContainer = connect(
  (state) => ({
    messages: state.messages,
  }),
  {}
)(ChatBox);
