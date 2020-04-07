import React, { Component, useState, useEffect } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { METADATA_ACTIVE } from "./../../../services/EndPoints";
import PropTypes from "prop-types";
import "./css/fixedTable.css";

class ModalAddIndexes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaladdindexes,
      auth: this.props.authorization,
      dataMetadataActive: [],
      newMetadataArray: [],
      term: "",
      alertDuplicate: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  geData = auth => {
    fetch(`${METADATA_ACTIVE}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataMetadataActive: data
        });
        console.log(this.state.dataMetadataActive);
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.geData(this.state.auth);
  };

  addMetadata = (id, name) => {
    let index = this.state.newMetadataArray.findIndex(aux => aux.id === id);
    const aux = this.state.newMetadataArray;
    if (index === -1) {
      aux.push({ id, name });
      this.setState({
        newMetadataArray: aux
      });
    } else {
      console.log("Error");
    }
  };

  deleteMeadata = id => {
    let data = this.state.newMetadataArray;
    data.filter(metadata => metadata.id !== id);
    this.setState({
      newMetadataArray: data
    });
    console.log(this.state.newMetadataArray);
  };

  // aux.push(id);
  //     this.setState({
  //   newMetadataArray: aux
  // });
  // console.log(this.state.newMetadataArray);

  render() {
    const searchMetada = term => {
      return function(x) {
        return x.name.toUpperCase().includes(term);
      };
    };
    const data = this.state.dataMetadataActive;
    const aux = data.filter(searchMetada(this.state.term)).map((aux, id) => {
      return (
        <tr key={id} className="text-center">
          <td>{(id += 1)}</td>
          <td>{aux.name}</td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.addMetadata(aux.id, aux.name);
              }}
            >
              <i className="fa fa-plus" />
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <Modal className="modal-xl" isOpen={this.state.modal}>
          <ModalHeader>
            <i className="fa fa-puzzle-piece" /> Agregar metadato a la plantilla
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-6">
                <div className="card card-body">
                  <div>
                    <input
                      type={"search"}
                      className="form-control form-control-sm"
                      value={this.state.term}
                      onChange={e => {
                        this.setState({
                          term: e.target.value
                        });
                      }}
                      placeholder={`Buscar metadato`}
                    />
                  </div>
                  <br />
                  {Object.keys(data) ? (
                    <div className="tableFixHead">
                      <table className="table table-hover table-striped">
                        <thead className="thead-light">
                          <tr>
                            <th className="text-center">id</th>
                            <th className="text-center">Nombre</th>
                            <th className="text-center">Accion</th>
                          </tr>
                        </thead>
                        <tbody>{aux}</tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="animated fadeIn">
                      <p className="alert alert-danger text-center">
                        <i className="fa fa-exclamation-triangle" /> No hay
                        datos disponibles
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <Example
                  data={this.state.newMetadataArray}
                  delete={() => {
                    this.deleteMeadata();
                  }}
                />
              </div>
            </div>
            {/* <form className="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Plantilla <span className="text-danger">*</span>{" "}
                    </label>
                    <dt>Nombre de la plantilla</dt>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Nombre del índice <span className="text-danger">
                        *
                      </span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      Tipo <span className="text-danger">*</span>{" "}
                    </label>
                    <select className="form-control form-control-sm">
                      <optgroup label="Generico">
                        <option>Consecutivo</option>
                        <option>Numerico</option>
                        <option>Alfanumerico</option>
                        <option>Fecha</option>
                        <option>Texto</option>
                        <option>Archivo</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>
            </form> */}
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success btn-sm">
              <i className="fa fa-plus" /> Crear nuevo índice
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalAddIndexes.propTypes = {
  modaladdindexes: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired
};

const Example = props => {
  const d = props.data;
  const [data, setData] = useState(d);

  // const deleteItem = id => {
  //   const aux = data.filter(e => e.id !== id);
  //   setData(aux);
  // };

  console.log(data);

  return (
    <div>
      {props.data.length ? (
        <div>
          <table className="table table-condensed table-hover">
            <thead>
              <th>#</th>
              <th>Nombre</th>
              <th>Accion</th>
            </thead>
            <tbody>
              {data.map((aux, id) => {
                return (
                  <tr key={id}>
                    <td>{(id += 1)}</td>
                    <td>{aux.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => props.delete(aux.id)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay datos</div>
      )}
    </div>
  );
};
export default ModalAddIndexes;
