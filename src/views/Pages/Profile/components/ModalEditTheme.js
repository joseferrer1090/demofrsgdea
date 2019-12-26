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
import { withTranslation, Trans, useTranslation } from "react-i18next";

class ModalEditTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledittheme,
      t: this.props.t
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            <Trans>{this.props.t("user_profile_tab_4_modal_edit")}</Trans>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <Card>
                  <CardHeader>
                    {" "}
                    <Trans>
                      {this.props.t("user_profile_tab_4_modal_edit_header")}
                    </Trans>{" "}
                  </CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>
                    {" "}
                    <Trans>
                      {this.props.t("user_profile_tab_4_modal_edit_body")}
                    </Trans>{" "}
                  </CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>
                    {" "}
                    <Trans>
                      {this.props.t("user_profile_tab_4_modal_edit_footer")}
                    </Trans>{" "}
                  </CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>
                    {" "}
                    <Trans>
                      {this.props.t("user_profile_tab_4_modal_edit_otros")}
                    </Trans>{" "}
                  </CardHeader>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="float-right">
              <button className="btn btn-secondary btn-sm">
                {" "}
                <i className="fa fa-pencil" />{" "}
                <Trans>
                  {this.props.t("user_profile_tab_4_modal_edit_button")}
                </Trans>{" "}
              </button>
              &nbsp;
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  this.setState({ modal: false });
                }}
              >
                {" "}
                <i className="fa fa-times" />{" "}
                <Trans>
                  {this.props.t("user_profile_tab_4_modal_cancel_button")}
                </Trans>{" "}
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
