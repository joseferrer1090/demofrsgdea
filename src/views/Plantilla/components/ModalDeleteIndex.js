import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import {
  TEMPLATE_METADATA_BAG_DELETE,
  THIRDPARTYS_EXPORT,
} from "./../../../services/EndPoints";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";

class ModalDeletePlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldeleteindex,
      auth: this.props.authorization,
      id: this.props.id,
      alert200: false,
      alert400: false,
      alert500: false,
      spinner: false,
      t: this.props.t,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevState.id) {
      this.setState({
        id: this.props.id,
      });
    }
  }

  deleteMetadata = () => {
    this.setState({
      spinner: true,
    });
    const auth = this.props.authorization;
    const username = decode(auth);
    fetch(
      `${TEMPLATE_METADATA_BAG_DELETE}/${this.state.id}?username=${username.user_name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth,
        },
      }
    )
      .then((response) => {
        if (response.status === 204) {
          this.setState({
            alert200: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState(
              {
                alert200: false,
                modal: false,
              },
              () => this.props.refresh()
            );
          }, 1300);
        } else if (response.status === 500) {
          this.setState({
            alert500: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alert500: false,
              modal: false,
            });
          }, 1300);
        } else if (response.status === 400) {
          this.setState({
            alert400: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alert400: false,
              modal: false,
            });
          }, 1300);
        }
      })
      .catch((err) => {
        this.setState({
          spinner: false,
        });
        console.log(`Error => ${err.message}`);
      });
  };

  render() {
    const { t } = this.state;
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>
          {t(
            "app_plantilla_administrar_view_metadatos_asociados_modal_eliminar_metadato_title"
          )}
        </ModalHeader>
        <ModalBody>
          <Alert color={"success"} isOpen={this.state.alert200}>
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_eliminar_metadato_alert_200"
            )}
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert400}>
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_eliminar_metadato_alert_400"
            )}
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert500}>
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_eliminar_metadato_alert_500"
            )}
          </Alert>
          <p className="text-center text-danger">
            <i className="fa fa-exclamation-triangle" />
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_eliminar_metadato_info"
            )}
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.deleteMetadata()}
            disabled={this.state.spinner}
          >
            {this.state.spinner ? (
              <i className=" fa fa-spinner fa-refresh" />
            ) : (
              <div>
                {" "}
                <i className="fa fa-trash" />{" "}
                {t(
                  "app_plantilla_administrar_view_metadatos_asociados_modal_eliminar_metadato_btn_eliminar"
                )}{" "}
              </div>
            )}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" />{" "}
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_eliminar_metadato_btn_cerrar"
            )}{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeletePlantilla.propTypes = {
  modaldeleteindex: PropTypes.bool.isRequired,
};

export default ModalDeletePlantilla;
