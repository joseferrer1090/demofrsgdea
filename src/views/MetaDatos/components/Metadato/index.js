import React, { Component } from "react";
import PropTypes from "prop-types";
import FormContainer from "./components/FormContainer";
import ToolBox from "./components/ToolBox";
import { Alert } from "reactstrap";

class Metadato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  toggle = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Alert color="secondary" isOpen={this.state.visible} fade>
          <h4 className="alert-heading">Well done!</h4>
          <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <hr />
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </Alert>
        <div className="row">
          <div className="col-md-3">
            <ToolBox />
          </div>
          <div className="col-md-9">
            <FormContainer />
          </div>
        </div>
      </div>
    );
  }
}

Metadato.propTypes = {};

export default Metadato;
