import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

class ModalDeletePais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel, 
      id: this.props.id,
      dataGroup: {}, 
      useLogged: "jferrer", 
      alertSuccess: false,
      alertError: false,
      alertCode: false,
    };
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal, 
      id: id
    });
    this.getDataGroup(id);
  };


  getDataGroup = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/groupuser/${id}?username=jferrer`, 
    {
      method: "GET", 
      headers: {
        "Content-Type": "application/json", 
        Authorization: "Basic " + window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataGroup: data
      })
    }).catch(err => console.log("Error", err))
  }
  
  render() {
    console.log(this.state.dataGroup);
    const dataInitial = {
      code: ""
    }
    return (
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar grupo de usuarios {this.state.dataGroup.name} </ModalHeader>
          <Formik 
           initialValues={dataInitial}
          onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/groupuser/${this.state.id}?code=${values.code}&username=${this.state.useLogged}`,
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
                    } else if (response.status === 204) {
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
              code: Yup.string().required(
                ' Por favor introduzca el codigo del conglomerado.'
              )
            })}
          
          >
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
                     <Alert
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        Error, al eliminar el grupo {values.code}
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        Se elimino de manera satisfactoria el grupo de usuarios
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        El codigo para eliminar no corresponde al grupo
                      </Alert>
                    <ModalBody>
                     
                <form className="form">
                  <p className="text-center">
                    {" "}
                    Confirmar el <code> Codigp </code> para eliminar el grupo de
                    usuarios{" "}
              </p>

               <input
                  type="text"
                  placeholder={"codigo"}
                  style={{ textAlign: 'center' }}
                  name="code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.code}
                  className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                    touched.code &&
                    'is-invalid'}`}
                />
              <br />
              <p className="text-center text-danger">
                {" "}q
                El grupo de usuarios quedará eliminado de manera permanente.{" "}
              </p>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-danger btn-sm" 
             onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}>
              {" "}
              <i className="fa fa-trash" /> Eliminar{" "}
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
                  </form>
                </Fragment>
              );
              }
            }
          </Formik>
        </Modal>
      </div>
    );
  }
}

ModalDeletePais.propTypes = {
  modaldel: PropTypes.bool.isRequired
};

export default ModalDeletePais;
