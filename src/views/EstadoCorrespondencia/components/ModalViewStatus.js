import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { obtenerEstadoCorrespondenciaID } from "./../../../actions/statusCorrespondenceActions";

class ModalViewStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      t: this.props.t,
    };
  }

  toogle = (id) => {
    this.setState({
      id: id,
      modal: !this.state.modal,
    });
    this.getStatus(id);
  };

  getStatus = (id) => {
    this.props.getData(id);
  };

  FechaCreacion(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacion(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const estado = this.props.estado;
    const { t } = this.state;
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>
          {t("app_filing_status_modal_ver_titulo")} {estado.name}
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <dt>{t("app_filing_status_modal_ver_nombre")}</dt>
                <dd>{estado.name}</dd>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <dt>{t("app_filing_status_modal_ver_fecha_creacion")}</dt>
                <dd>{this.FechaCreacion(estado.createdAt)}</dd>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <dt>{t("app_filing_status_modal_ver_fecha_modificacion")}</dt>
                <dd>{this.FechaModificacion(estado.updatedAt)}</dd>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <dt>{t("app_filing_status_modal_ver_descripcion")}</dt>
                <textarea
                  className="form-control form-control-sm"
                  value={estado.description}
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => this.setState({ modal: false })}
          >
            <i className="fa fa-times" />{" "}
            {t("app_filing_status_modal_ver_btn_cerrar")}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewStatus.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

function mapState(state) {
  return { estado: state.statusCorrespondenceReducer.estado };
}

function mapDispatch(dispatch) {
  return {
    getData: (id) => {
      dispatch(obtenerEstadoCorrespondenciaID(id));
    },
  };
}

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  ModalViewStatus
);
