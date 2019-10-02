import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropType from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

class ModalDeleteRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      id: this.props.id,
      userName: "jferrer",
      dataRolById: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataRolById(id);
  };

  getDataRolById = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/role/${id}?username=${this.state.userName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataRolById: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  render() {
    const dataInitial = {
      codigo: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            Eliminar rol {this.state.dataRolById.name}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //alert(JSON.stringify(values));
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/role/${this.state.id}?code=${values.codigo}&username=${this.state.userName}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Basic " + window.btoa("sgdea:123456")
                    }
                  }
                )
                  .then(response => {
                    if (response.status === 500) {
                      console.log("Error 500");
                    } else if (response.status === 200) {
                      console.log("Se Elimino");
                    } else if (response.status === 400) {
                      console.log("SE enviaron mal los datos");
                    }
                  })
                  .catch(err => console.log("Error", err));
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string().required(
                " Por favor introduzca el codigo del rol a eliminar"
              )
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
                        Confirmar el <code> Codigo </code> para eliminar el rol{" "}
                      </p>
                      <input
                        name="codigo"
                        value={values.codigo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control col-sm-6 offset-sm-3 form-control-sm"
                        type="text"
                        placeholder=""
                        style={{ textAlign: "center" }}
                      />
                      <br />
                      <p className="text-center text-danger">
                        {" "}
                        El rol quedará eliminado de manera permanente.{" "}
                      </p>
                    </form>
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
                      {" "}
                      <i className="fa fa-trash" /> Eliminar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
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

ModalDeleteRoles.propType = {
  modaldelete: PropType.bool.isRequired
};

export default ModalDeleteRoles;
