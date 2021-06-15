import { connect } from "react-redux";
import Contact from "./Contact";
import { select } from "../current/currentSlice";

const mapDispatchToProps = (dispatch) => {
  return {
    selectCurrent: (name) => dispatch(select(name)),
  };
};

export const ContactContainer = connect(null, mapDispatchToProps)(Contact);
