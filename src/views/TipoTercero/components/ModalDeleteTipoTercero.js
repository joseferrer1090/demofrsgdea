import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as Yup from "yup";
import { Formik, withFormik, ErrorMessage, Field, From} from 'formik';

class ModalDeleteTipoTercero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      idTipoTercero: this.props.id,
      nombre:"",
      useLogged:"",
      alertSuccess: false,
      alertError: false,
      alertName: false
    };
  }

  toggle = (id) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      idTipoTercero:id,
      nombre:"",
      useLogged:"ccuartas"
    }));
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertName: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      nombre: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Eliminar tipo de tercero </ModalHeader>
          <Formik
          initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/typethirdparty/${
                    this.state.idTipoTercero
                  }?name=${values.nombre}&username=${this.state.useLogged}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "BASIC " + window.btoa("sgdea:123456")
                    }
                  }
                )
                .then(response => {
                  if (response.status === 500) {
                    this.setState({
                      alertError: true
                    });
                  }
                    else if (response.status === 204) {
                      this.setState({
                          alertSuccess: true
                    });
                    setTimeout(()=>{
                      this.setState({
                        modal:false,
                        alertSuccess: false
                      })
                    },3000)
                  } else if (response.status === 400) {
                    this.setState({
                      alertName: true
                    });
                  }
              })
                  .catch(error => console.log(" ", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              nombre: Yup.string().required("Por favor introduzca un nombre.")
            })}
          >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <Fragment>
          <ModalBody>
            <form className="form">
              <p className="text-center">
                {" "}
                Confirmar el <code> Nombre </code> para eliminar el tipo de
                tercero{" "}
              </p>

              <input
                input
                name={"nombre"}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="nombre para eliminar la sede"
                style={{ textAlign: "center" }}
                className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.nombre &&
                  touched.nombre &&
                  "is-invalid"}`}
              />
              <div className="text-center" style={{ color: "#D54B4B" }}>
                {errors.nombre && touched.nombre ? (
                    <i class="fa fa-exclamation-triangle" />
                  ) : null}
                  <ErrorMessage name="nombre" />
                </div>
              <br />
              <p className="text-center text-danger">
                {" "}
                El tipo de tercero quedará eliminado de manera permanente.{" "}
              </p>
            </form>
          </ModalBody>
          <ModalFooter>
          <button
              type="button"
              className={"btn btn-outline-danger btn-sm"}
              onClick={e => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <i className="fa fa-trash" /> Eliminar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false,
                  alertError: false,
                  alertSuccess: false,
                  alertName: false
                 });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
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

ModalDeleteTipoTercero.propTypes = {
  modaldelete: PropTypes.bool.isRequired
};

export default ModalDeleteTipoTercero;
