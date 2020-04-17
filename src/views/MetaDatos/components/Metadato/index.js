import React, { Component } from "react";
import PropTypes from "prop-types";
import FormContainer from "./components/FormContainer";
import ToolBox from "./components/ToolBox";
import { Alert } from "reactstrap";
import { withFormik } from "formik";
import { withTranslation } from "react-i18next";

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
    const { t } = this.props;
    return (
      <div>
        <Alert color="secondary" isOpen={this.state.visible} fade>
          <h4 className="alert-heading">
            {t("app_metadatos_crear_metadato_alert_title")}
          </h4>
          <p>{t("app_metadatos_crear_metadato_alert_parrafo")}</p>
          <hr />
          <p className="mb-0">
            {t("app_metadatos_crear_metadato_alert_parrafo_2")}
          </p>
        </Alert>
        <div className="row">
          <div className="col-md-3">
            <ToolBox t={this.props.t} />
          </div>
          <div className="col-md-9 ">
            <FormContainer
              loader={false}
              debug={false}
              updateOnMount={true}
              updateForm={this.updateForm}
              onSave={this.myForm}
              authorization={this.state.authoToken}
              t={this.props.t}
            />
          </div>
        </div>
      </div>
    );
  }
}

Metadato.propTypes = {};

export default withTranslation("translations")(Metadato);
