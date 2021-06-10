import { connect } from "react-redux";
import Contact from "../components/contact/Contact";
import { select } from "../features/current/currentSlice";

const mapDispatchToProps = (dispatch) => {
  return {
    selectCurrent: (name) => dispatch(select(name)),
  };
};

export const ContactContainer = connect(null, mapDispatchToProps)(Contact);
