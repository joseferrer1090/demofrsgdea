import DefaultLayout from "./DefaultLayout";
import { connect } from "react-redux";
import { userActions } from "./../actions/";

const mapState = state => {
  console.log(state);
  return { state };
};

const actionCreators = {
  logout: userActions.logout
};

export default connect(mapState, actionCreators)(DefaultLayout);
