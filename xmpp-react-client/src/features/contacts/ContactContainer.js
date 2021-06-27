import { connect } from "react-redux";
import { select } from "../current/currentSlice";
import Contact from "./Contact";

const mapDispatchToProps = (dispatch) => {
  return {
    select: (name) => dispatch(select(name)),
  };
};

export const ContactContainer = connect(null, mapDispatchToProps)(Contact);
