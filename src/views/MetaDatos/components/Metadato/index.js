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

  myForm = form => {
    console.log(form);
  };

  updateForm = callback => {
    // let rawForm =
    //   '[{"title":"ADS","toolType":"RADIO_BUTTONS","multiple":false,"inline":false,"defaultValue":"","placeholder":"","description":"","validation":{"isReadOnly":false,"isRequired":false,"min":6,"max":6},"radios":[]},{"title":"Title","toolType":"CHECK_BOXES","inline":false,"defaultValue":"","placeholder":"","description":"","validation":{"isReadOnly":false,"isRequired":false,"min":6,"max":6},"checkBoxes":[]}]';
    // let form = JSON.parse(rawForm);
    // callback(form);
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
            <FormContainer
              updateOnMount={true}
              updateForm={this.updateForm}
              onSave={this.myForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

Metadato.propTypes = {};

export default Metadato;
