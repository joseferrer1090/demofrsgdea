import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardBody,
  CardHeader,
  Alert
} from "reactstrap";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { decode } from "jsonwebtoken";
import {
  FIND_BY_METADATA_BAG_ID,
  METADATA_DETAIL_CREATE,
  METADATA_DETAIL_DELETE,
  METADATA_DETAIL_PUT
} from "./../../../../../services/EndPoints";
import * as Yup from "yup";

class ModalUpdateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldetails,
      auth: this.props.authorization,
      id: this.props.id,
      idMetadata: "",
      data: [],
      metadata: {},
      hiddenColumnID: true,
      information: true,
      actions: {
        visible1: true,
        visible2: true,
        visible3: true
      },
      formcreate: {
        title: "",
        value: "",
        id: "",
        alertError: false,
        alertErrorMessage: ""
      },
      titleupdate: "",
      valueupdate: "",
      idupdate: "",
      alertError: false,
      alertErrorMessage: "",
      formdelete: {
        title: ""
      }
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // Metodo para traer la data del array y los actualizar
    if (this.props.id !== prevProps.id) {
      this.setState(
        {
          id: this.props.id,
          auth: this.props.authorization
        },
        () => this.getDataDetailsById(this.state.id, this.state.auth)
      );
    }
  }

  getDataDetailsById = (id, auth) => {
    fetch(`${FIND_BY_METADATA_BAG_ID}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        });
        //console.log(this.state.data);
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  accionesDetails(cell, row) {
    return (
      <div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.setState({
              actions: {
                ...this.state.actions,
                visible2: !this.state.actions.visible2
              },
              idMetadata: row.id,
              titleupdate: row.labelText,
              valueupdate: row.inputValue,
              idupdate: row.inputId
            });
          }}
        >
          {" "}
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.setState({
              actions: {
                ...this.state.actions,
                visible3: !this.state.actions.visible3
              },
              idMetadata: row.id,
              formdelete: {
                ...this.state.formdelete,
                title: row.labelText
              }
            });
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  createCustomButton = props => {
    return (
      <button
        className="btn btn-success btn-sm"
        onClick={() => {
          this.setState({
            actions: {
              ...this.state.actions,
              visible1: !this.state.actions.visible1
            }
          });
        }}
      >
        <i className="fa fa-plus-circle" />
      </button>
    );
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  // PostCreateDetail
  createDetail = e => {
    e.preventDefault();
    const aux = this.state.auth;
    const username = decode(aux);
    fetch(`${METADATA_DETAIL_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux
      },
      body: JSON.stringify({
        labelText: this.state.formcreate.title,
        inputId: this.state.formcreate.id,
        inputValue: this.state.formcreate.value,
        userName: username.user_name,
        metadataBagId: this.state.id
      })
    })
      .then(resp => {
        if (resp.status === 201) {
          setTimeout(() => {
            this.setState({
              actions: {
                ...this.state.actions,
                visible1: !this.state.actions.visible1
              }
            });
            this.getDataDetailsById(this.state.id, this.state.auth);
          }, 500);
          console.log("Se creo el detalle en la base de datos");
        } else if (resp.status === 400) {
          console.log("Se enviaron mal los datos");
        } else if (resp.status === 500) {
          console.log("Error");
        }
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
    // alert(
    //   JSON.stringify(
    //     {
    //       labelText: this.state.formcreate.title,
    //       inputId: this.state.formcreate.id,
    //       inputValue: this.state.formcreate.value,
    //       userName: username.user_name,
    //       metadataBagId: this.state.id
    //     },
    //     null,
    //     2
    //   )
    // );
  };

  // DeleteDetails
  deleteDetail = e => {
    e.preventDefault();
    const aux = this.state.auth;
    const username = decode(aux);
    fetch(
      `${METADATA_DETAIL_DELETE}${this.state.idMetadata}?username=${username.user_name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + this.state.auth
        }
      }
    )
      .then(resp => {
        if (resp.status === 204) {
          setTimeout(() => {
            this.setState({
              actions: {
                ...this.state.actions,
                visible3: !this.state.actions.visible3
              }
            });
            this.getDataDetailsById(this.state.id, this.state.auth);
          }, 1200);
        } else if (resp.status === 500) {
          console.log(`Error`);
        }
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  // PutDeatiails
  putDetails = e => {
    const aux = this.state.auth;
    const username = decode(aux);
    // console.log(
    //   JSON.stringify({
    //     id: this.state.idMetadata,
    //     labelText: this.state.titleupdate,
    //     inputId: this.state.idupdate,
    //     inputValue: this.state.valueupdate,
    //     userName: username.user_name,
    //     metadataBagId: this.state.id
    //   })
    // );
    fetch(`${METADATA_DETAIL_PUT}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux
      },
      body: JSON.stringify({
        id: this.state.idMetadata,
        labelText: this.state.titleupdate,
        inputId: this.state.idupdate,
        inputValue: this.state.valueupdate,
        userName: username.user_name,
        metadataBagId: this.state.id
      })
    })
      .then(resp => {
        if (resp.status === 200) {
          setTimeout(() => {
            this.setState({
              actions: {
                ...this.state.actions,
                visible2: !this.state.visible2
              }
            });
            this.getDataDetailsById(this.state.id, this.state.auth);
          }, 1200);
          console.log("Ok");
        } else if (resp.status === 400) {
          console.log("Error al enviar los datos");
        } else if (resp.status === 500) {
          console.log("Error del servidor");
        }
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  // Validaciones del formCreate
  sendData = e => {
    e.preventDefault();
    Yup.setLocale({});
    const schema = Yup.object().shape({
      title: Yup.string()
        .trim()
        .required(),
      value: Yup.string()
        .trim()
        .required(),
      id: Yup.string()
        .trim()
        .required()
    });
    schema
      .validate({
        title: this.state.formcreate.title,
        value: this.state.formcreate.value,
        id: this.state.formcreate.id
      })
      .then(e => {
        if (schema.isValid) {
          this.createDetail(e);
        }
      })
      .catch(err => {
        this.setState({
          formcreate: {
            ...this.state.formcreate,
            alertError: true,
            alertErrorMessage: err.message
          }
        });
        setTimeout(() => {
          this.setState({
            formcreate: {
              ...this.state.formcreate,
              alertError: false
            }
          });
        }, 1100);
      });
  };

  // Validacion del updateForm
  sendDataUpdate = e => {
    Yup.setLocale({});
    const schema = Yup.object().shape({
      title: Yup.string()
        .trim()
        .required(),
      value: Yup.string()
        .trim()
        .required(),
      id: Yup.string()
        .trim()
        .required()
    });
    schema
      .validate({
        title: this.state.titleupdate,
        value: this.state.valueupdate,
        id: this.state.idupdate
      })
      .then(e => {
        if (schema.isValid) {
          this.putDetails(e);
        }
      })
      .catch(err => {
        this.setState({
          alertError: true,
          alertErrorMessage: err.message
        });
        setTimeout(() => {
          this.setState({
            alertError: false
          });
        }, 1100);
      });
  };

  render() {
    const options = {
      btnGroup: this.createCustomButton
    };

    return (
      <Modal isOpen={this.state.modal} className="modal-lg">
        <ModalHeader>
          <i className="fa fa-pencil" /> Actualizar detalles {this.props.name}
        </ModalHeader>
        <ModalBody>
          <Alert
            color={"light"}
            isOpen={this.state.information}
            toggle={() => {
              this.setState({ information: false });
            }}
          >
            <i className="fa fa-exclamation-triangle" /> Esto detalles
            corresponde unicamente, aquellos metadatos que tienen seleccion
            multiple, SELECT, RADIO, CHECKBOX
          </Alert>
          <div
            className="col-md-12 animated fadeIn"
            hidden={this.state.actions.visible3}
          >
            <div className="col-md-12">
              <div className="alert alert-danger" role="alert">
                <p className="text-justify mb-0">
                  Borrar detalle <strong>{this.state.formdelete.title}</strong>
                  <br />
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={e => this.deleteDetail(e)}
                  >
                    Borrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                      this.setState({
                        actions: {
                          ...this.state.actions,
                          visible3: !this.state.actions.visible3
                        }
                      });
                    }}
                  >
                    Cancelar
                  </button>
                </p>
              </div>
            </div>
          </div>
          <BootstrapTable
            data={this.state.data}
            options={options}
            striped
            bordered={false}
            style={{ padding: "0px", margin: "0px", zoom: "0" }}
          >
            <TableHeaderColumn
              dataField={"id"}
              isKey
              hidden={this.state.hiddenColumnID}
            >
              id
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"labelText"} dataAlign={"center"}>
              Titulo
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"inputValue"} dataAlign={"center"}>
              Valor
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign={"center"}
              dataFormat={(cell, row) => this.accionesDetails(cell, row)}
            >
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
          {/* <p>{this.state.id}</p> */}
          <br />
          <div
            className=" animated fadeIn col-md-12"
            hidden={this.state.actions.visible1}
            // style={{ border: "1px solid green" }}
          >
            <Card>
              <CardHeader>Agregar nuevo detalle </CardHeader>
              <CardBody>
                <Alert
                  isOpen={this.state.formcreate.alertError}
                  color={"danger"}
                >
                  <i className="fa fa-exclamation-triangle" />{" "}
                  {this.state.formcreate.alertErrorMessage}
                </Alert>
                <form className="form" ref={el => (this.myFormCreate = el)}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Titulo</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.formcreate.title}
                          onChange={e => {
                            this.setState({
                              formcreate: {
                                ...this.state.formcreate,
                                title: e.target.value
                              }
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Valor</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.formcreate.value}
                          onChange={e => {
                            this.setState({
                              formcreate: {
                                ...this.state.formcreate,
                                value: e.target.value
                              }
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>id</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.formcreate.id}
                          onChange={e => {
                            this.setState({
                              formcreate: {
                                ...this.state.formcreate,
                                id: e.target.value
                              }
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        this.sendData(e);
                      }}
                    >
                      <i className="fa fa-plus-circle" /> Crear detalle{" "}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
          <div
            className="col-md-12 animated fadeIn"
            hidden={this.state.actions.visible2}
          >
            <Card>
              <CardHeader>Actualizar detalle</CardHeader>
              <CardBody>
                <Alert color={"danger"} isOpen={this.state.alertError}>
                  <i className="fa fa-exclamation-triangle" />{" "}
                  {this.state.alertErrorMessage}
                </Alert>
                <form className="form">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Titulo</label>
                        <input
                          type={"text"}
                          className="form-control form-control-sm"
                          value={this.state.titleupdate}
                          onChange={e => {
                            this.setState({
                              titleupdate: e.target.value
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Valor</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.valueupdate}
                          onChange={e => {
                            this.setState({
                              valueupdate: e.target.value
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Id</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.idupdate}
                          onChange={e => {
                            this.setState({
                              idupdate: e.target.value
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={e => this.sendDataUpdate(e)}
                    >
                      <i className="fa fa-pencil" />
                      Actualizar detalle
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalUpdateDetails;
