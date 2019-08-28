import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

class ModalEditTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledittheme
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Modal editar Tema </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <Card>
                  <CardHeader>Header</CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>Body</CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>Footer</CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>Otros componentes</CardHeader>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="float-right">
              <button className="btn btn-secondary">
                {" "}
                <i className="fa fa-pencil" />{" "}
                {t("user_profile_tab_4_modal_edit_button")}{" "}
              </button>
              &nbsp;
              <button
                className="btn btn-secondary"
                onClick={() => {
                  this.setState({ modal: false });
                }}
              >
                {" "}
                <i className="fa fa-times" />{" "}
                {t("user_profile_tab_4_modal_cancel_button")}{" "}
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditTheme.propTypes = {
  modaledittheme: PropTypes.bool.isRequired
};

export default ModalEditTheme;
