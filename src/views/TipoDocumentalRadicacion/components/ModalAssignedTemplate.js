import React, { Component, Fragment } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import {
  TYPEDOCUMENTARY_SHOW,
  TEMPLATE_ACTIVE,
} from "./../../../services/EndPoints";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import { Formik } from "formik";
import * as Yup from "yup";

class ModalAssignedTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalassigned: this.props.modal,
      auth: this.props.authorization,
      t: this.props.t,
      id: this.props.id,
      dataTypeDocumentary: {},
    };
  }

  toggle = (id) => {
    this.setState({
      modalassigned: !this.state.modalassigned,
      id: id,
    });
    this.getDataTypeDocumentary(id);
  };

  getDataTypeDocumentary = (id) => {
    const auth = this.props.authorization;
    const username = decode(auth);
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTypeDocumentary: data.typeDocumentary,
        });
      })
      .catch((err) => {
        console.log(`Error, ${err}`);
      });
  };

  render() {
    const { dataTypeDocumentary } = this.state;
    return (
      <Fragment>
        <Modal
          className="modal-lg"
          isOpen={this.state.modalassigned}
          toggle={this.toggle}
        >
          <ModalHeader>
            <i className="fa fa-object-group" /> Asingar plantilla al tipo
            documental {dataTypeDocumentary.name}
          </ModalHeader>
          <Formik
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
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
                    <div className="text-justify">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.{" "}
                      <b>
                        (Informacion de advertencias para la asignacion de
                        plantilla)
                      </b>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-md-8">
                          <form className="form card card-body">
                            <div className="row">
                              <div className="col-md-8">
                                <div className="form-group">
                                  <label>
                                    Plantilla Seleccionada{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select className="form-control form-control-sm">
                                    <option>--Seleccione--</option>
                                    <option>Plantilla 1</option>
                                    <option>Plantilla 2</option>
                                    <option>Plnatilla 3</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <div>
                      <button
                        type={"submit"}
                        className="btn btn-secondary btn-sm"
                        onClick={() => props.handleSubmit()}
                      >
                        <i className="fa fa-check" />
                        Asignar plantilla
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.setState({ modalassigned: false })}
                      >
                        <i className="fa fa-times" /> Cerrar
                      </button>
                    </div>
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

ModalAssignedTemplate.propTypes = {
  authorization: PropTypes.string.isRequired,
  t: PropTypes.any,
};

export default ModalAssignedTemplate;
