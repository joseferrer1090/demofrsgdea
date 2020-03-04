import React, { Component } from "react";
import PropTypes from "prop-types";
import Metadato from "./components/Metadato/index";

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

class MetaDatos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: ""
    };
  }

  componentDidMount() {
    //this.getDataLocal();
    console.log(this.state.authToken);
  }

  getDataLocal = () => {
    asyncLocalStorage
      .getItem("user")
      .then(resp => {
        return JSON.parse(resp);
      })
      .then(resp => {
        this.setState({
          authToken: resp.data.access_token
        });
      });
  };

  render() {
    console.log(this.state.authToken);
    return (
      <div>
        <Metadato authorization={this.state.authToken} />
      </div>
    );
  }
}

export default MetaDatos;
