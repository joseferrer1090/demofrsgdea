import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, withFormik, ErrorMessage, Field, From } from "formik";
import { Trans } from "react-i18next";

class ModalDeleteConglomerado extends React.Component {
  state = {
    modal: this.props.modaldeletestate,
    idConglomerado: this.props.id,
    alertSuccess: false,
    alertError: false,
    alertName: false,
    t: this.props.t, 
    code: ""
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idConglomerado: id,
      useLogged: "jferrer"
    }, () => this.props.updateTable());
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertCode: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      code: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {this.props.t("app_conglomerado_modal_eliminar_titulo")}
          </ModalHeader>
          <Formik initialValues={dataInitial} onSubmit={(values, setSubmitting) => {
            setTimeout(() => {
              fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/${this.state.idConglomerado}?code=${values.code}&username=${this.state.useLogged}`,{
                method: "DELETE", 
                headers:{
                  "Content-Type": "application/json", 
                  Authorization: "BASIC " + window.btoa("sgdea:123456")
                }
              }).then(response => {
                console.log(response);
                if (response === 500) {
                  this.setState({
                    alertError: true
                  })
                  setTimeout(() => {
                      this.setState({
                        modal: false,
                        alertError: false
                      }, () => {this.props.updateTable()});
                    }, 3000);
                } else if(response === 204) {
                  console.log(response);
                  this.setState({
                    alertSuccess: true, 
                  }, () => this.props.updateTable())
                 
                }
              }).catch(Error => console.log("", Error));
              // alert(JSON.stringify(values, "", 2))
            }, 3000);
          }} validationSchema={Yup.object().shape({
            code: Yup.string().required(
              " Por favor introduzca el codigo del conglomerado."
            )
          })}>
            {
              props => {
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
                return(
                  <Fragment>
                    <form className="form">
                    <ModalBody>
                    <p className="text-center">
                        {" "}
                        {this.props.t(
                          "app_conglomerado_modal_eliminar_informacion"
                        )}
                      </p>
                      <input
                        type="text"
                        placeholder={this.props.t(
                          "app_conglomerado_modal_eliminar_placeholder"
                        )}
                        style={{ textAlign: "center" }}
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                          touched.code &&
                          "is-invalid"}`}
                      />
                       <div className="text-center" style={{ color: "#D54B4B" }}>
                        {errors.code && touched.code ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="code" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        {" "}
                        {this.props.t(
                          "app_conglomerado_modal_eliminar_informacion_2"
                        )}{" "}
                      </p>
                  </ModalBody>
                  <ModalFooter>
                    <button type="submit" 
                    className="btn btn-outline-danger" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleSubmit();
                      }}> Eliminar  
                      </button>
                  <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError: false,
                          alertCode: false,
                          alertSuccess: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {this.props.t("app_conglomerado_modal_eliminar_boton_2")}{" "}
                    </button>
                  </ModalFooter>
                  </form>
                  </Fragment>
                );
              }
            }
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalDeleteConglomerado.propTypes = {
  modaldeletestate: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalDeleteConglomerado;
