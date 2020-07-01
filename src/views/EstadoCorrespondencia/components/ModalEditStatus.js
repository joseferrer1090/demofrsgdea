import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  obtenerEstadoCorrespondenciaID,
  editarEstadoCorrespondencia,
} from "./../../../actions/statusCorrespondenceActions";
import { Modal, ModalBody, ModalHeader, ModalFooter, Alert } from "reactstrap";

class ModalEditStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
    };
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
    });
    this.getDate(id);
  };

  getDate = (id) => {
    this.props.getDataEdit(id);
  };

  render() {
    const estado = this.props.estadoEdit;
    const aux = {
      id: estado.id,
      name: estado.name,
      description: estado.description,
    };
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Editar valores {aux.name}</ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={aux}
            onSubmit={(values, { setSubmiting }) => {
              setTimeout(() => {
                this.props.editStatus(values);
              }, 1200);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(" Nombre no puede ir vacio"),
              description: Yup.string(),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                isSubmitting,
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <form>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Nombre</label>
                            <input
                              type="text"
                              name={"name"}
                              className="form-control form-control-sm"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Descripcion</label>
                            <textarea
                              name="description"
                              className="form-control form-control-sm"
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {" "}
                      <i className="fa fa-pencil" /> Editar valores del estado
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" /> Cancelar
                    </button>
                  </ModalFooter>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalEditStatus.propTypes = {};

function mapState(state) {
  return {
    estadoEdit: state.statusCorrespondenceReducer.estado,
    alertError: state.statusCorrespondenceReducer.notificacionerror,
    alertSuccess: state.statusCorrespondenceReducer.notificacion,
  };
}

function mapDispatch(dispatch) {
  return {
    getDataEdit: (id) => {
      dispatch(obtenerEstadoCorrespondenciaID(id));
    },
    editStatus: (estado) => {
      dispatch(editarEstadoCorrespondencia(estado));
    },
  };
}

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  ModalEditStatus
);
