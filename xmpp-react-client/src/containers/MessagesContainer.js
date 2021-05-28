import { connect } from "react-redux";
import Messages from "../components/messages/Messages";

export const MessagesContainer = connect(
  (state) => ({
    messages: state.messages,
  }),
  {}
)(Messages);
