import React, { Component } from "react";
import PropTypes from "prop-types";
import TableContent from "./components/TableContentMetadata";

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

class ListaMetadato extends Component {
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
    console.log(this.state.authToken);
    return (
      <div>
        <p>Lista de metadatos</p>
      </div>
    );
  }
}

ListaMetadato.propTypes = {};

export default ListaMetadato;
