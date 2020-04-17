import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Spinner
} from "reactstrap";
import { decode } from "jsonwebtoken";
import { TEMPLATE_EMAIL } from "./../../../../services/EndPoints";
import { withTranslation } from "react-i18next";

class ShowTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      codeHTML: "",
      codeCSS: "",
      auth: this.props.authorization,
      id: this.props.id,
      spinner: true,
      t: this.props.t
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TEMPLATE_EMAIL}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          codeHTML: data.body,
          codeCSS: data.css,
          template_name: data.name
        });

        let template = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style type="text/css">${this.state.codeCSS}</style>
        </head>
        <body>${this.state.codeHTML}</body>
        </html>`;
        setTimeout(() => {
          document.getElementById("divView").innerHTML = template;
          this.setState({ spinner: false });
        }, 2000);
      });
  };

  Loadingspinner = () => {
    const { spinner } = this.state;
    if (spinner === true) {
      return (
        <center>
          <Spinner
            style={{ width: "3rem", height: "3rem" }}
            type="grow"
            color="primary"
          />
        </center>
      );
    } else if (spinner === false) {
      return null;
    }
  };

  render() {
    const { template_name } = this.state;
    const { t } = this.state;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_plantilla_email_modal_preview_titulo")} {template_name}
          </ModalHeader>
          <ModalBody>
            {this.Loadingspinner()}
            <div id="divView"></div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false, spinner: true });
              }}
            >
              <i className="fa fa-times" />{" "}
              {t("app_plantilla_email_modal_preview_btn_cerrar")}
            </button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
ShowTemplate.propTypes = {
  modal: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
export default ShowTemplate;
