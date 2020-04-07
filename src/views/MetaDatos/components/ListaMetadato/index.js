import React, { Component } from "react";
import PropTypes from "prop-types";
import TableContent from "./components/TableContentMetadata";
import { withTranslation } from "react-i18next";

const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

class ListaMetadato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    asyncLocalStorage
      .getItem("user")
      .then((resp) => {
        return JSON.parse(resp);
      })
      .then((resp) => {
        this.setState({
          authToken: resp.data.access_token,
        });
      });
  };

  render() {
    const authToken = this.state.authToken;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <TableContent authorization={authToken} t={this.props.t} />
          </div>
        </div>
      </div>
    );
  }
}

ListaMetadato.propTypes = {};

export default withTranslation("translations")(ListaMetadato);
