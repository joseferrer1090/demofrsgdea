import React, { Component, Fragment} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from "reactstrap";
import PropTypes from "prop-types";
import {Formik, withFormik, ErrorMessage, Field, Form} from "formik";
import * as Yup from "yup";


class ModalDeleteTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      id: this.props.id, 
      username: "jferrer", 
      dataProcedure: {}, 
       alertSuccess: false,
    alertError: false,
    alertCode: false,
    code: ""
    };
  }

   onDismiss = () => {
    this.setState({
      alertError: false,
      alertCode: false,
      alertSuccess: false
    });
  };

  toggle = (id) => {
    this.setState(prevState => ({
      modal: !prevState.modal, 
      id: id
    }));
    fetch(`http://192.168.20.187:7000/api/sgdea/typeprocedure/${id}?username=${this.state.username}`,{
      method: "GET", 
      headers:{
        "Content-Type":"application/json", 
        Authorization: "Basic " + window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataProcedure: data
      })
    }).catch(err => console.log("Error", err));
  };

  render() {
    const dataInitial = {
      code: ""
    };
    return (
      <Fragment>
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Eliminar tramite {this.state.dataProcedure.name} </ModalHeader>
        <Formik  
        initialValues={dataInitial}
         onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.20.187:7000/api/sgdea/typeprocedure/${this.state.id}?code=${values.code}?username=${this.state.username}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'BASIC ' + window.btoa('sgdea:123456')
                    }
                  }
                )
                  .then(response => {
                    if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                    } else if (response.status === 200) {
                      setTimeout(() => {
                        this.setState(
                          {
                            alertSuccess: true,
                            modal: false
                          },
                         () => this.props.updateTable()
                        );
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertCode: true
                      });
                    }
                  })
                  .catch(Error => console.log('', Error));
                // alert(JSON.stringify(values, "", 2))
              }, 3000);
            }}
          validationSchema={Yup.object().shape({
            code: Yup.string().required('Por favor introduzca el codigo el tipo de tramite')
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
                         <Alert
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        Error, al eliminar el tipo de tramite {values.code}
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        Se elimino de manera satisfactoria el tipo de tramite
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        El codigo para eliminar tipo de tramite  no corresponde
                      </Alert>
                       <p className="text-center">
                          {" "}
                            Confirmar el <code> codigo </code> para eliminar el tipo de
                            tramite{" "}
                      </p>
                      <input
                        type="text"
                        placeholder="codigo del tipo de tramite"
                        style={{ textAlign: 'center' }}
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                          touched.code &&
                          'is-invalid'}`}
                      />
                      <div className="text-center" style={{ color: '#D54B4B' }}>
                        {errors.code && touched.code ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="code" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                          El tipo de tramite quedara eliminado permanentemente.
                          
                      </p>
                      </ModalBody>
                      <ModalFooter>
                          <button
                        type="submit"
                        className="btn btn-outline-danger btn-sm"
                        onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        {' '}
                        <i className="fa fa-trash" /> Eliminar
                      </button>
                          <Button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              this.setState({ modal: false });
                            }}
                          >
                            <i className="fa fa-times" /> Cerrar{" "}
                          </Button>
                      </ModalFooter>
                    </form>
                  </Fragment>
                )
              }
            }
        </Formik>
      </Modal>
      </Fragment>
    );
  }
}

ModalDeleteTramite.propTypes = {
  modaldelte: PropTypes.bool.isRequired
};

export default ModalDeleteTramite;
