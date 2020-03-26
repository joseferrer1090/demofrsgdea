import React, { Component } from "react";
import PropTypes from "prop-types";
import FormContainer from "./components/FormContainer";
import ToolBox from "./components/ToolBox";
import { Alert } from "reactstrap";

const asyncLocalStorage = {
  setItem: async function(key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function(key) {
    await null;
    return localStorage.getItem(key);
  }
};

class Metadato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      authoToken: ""
    };
  }

  componentDidMount() {
    this.getDataLocal();
  }

  toggle = () => {
    this.setState({
      visible: false
    });
  };

  myForm = form => {
    console.log(form);
  };

  updateForm = callback => {};

  getDataLocal = () => {
    asyncLocalStorage
      .getItem("user")
      .then(resp => {
        return JSON.parse(resp);
      })
      .then(resp => {
        this.setState({
          authoToken: resp.data.access_token
        });
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
          <div className="col-md-9 ">
            <FormContainer
              loader={false}
              debug={false}
              updateOnMount={true}
              updateForm={this.updateForm}
              onSave={this.myForm}
              authorization={this.state.authoToken}
            />
          </div>
        </div>
      </div>
    );
  }
}

Metadato.propTypes = {};

export default Metadato;
