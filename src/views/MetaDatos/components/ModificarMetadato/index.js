import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import TableContent from "./components/TableContentMetada";

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

class ModificarMetadato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: ""
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
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
    const authToken = this.state.authToken;
    return (
      <div className="animated fadeIn">
        <TableContent authorization={authToken} />
      </div>
    );
  }
}

ModificarMetadato.propTypes = {};

export default ModificarMetadato;
