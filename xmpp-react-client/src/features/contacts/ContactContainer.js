import { connect } from "react-redux";
import Contact from "./Contact";
import { select } from "../current/currentSlice";

const mapDispatchToProps = (dispatch) => {
  return {
    select: (name) => dispatch(select(name)),
  };
};

export const ContactContainer = connect(null, mapDispatchToProps)(Contact);
