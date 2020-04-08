import React, { Component, forwardRef } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { METADATA_ACTIVE } from "./../../../services/EndPoints";
import { connect } from "react-redux";
import { agregarMetadaEditAction } from "./../../../actions/templateMetadataActions";

class ModalAddIndexes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalindexes,
      auth: this.props.authorization,
      dataMetadataActive: [],
      term: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
  }

  geData = (auth) => {
    fetch(`${METADATA_ACTIVE}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          dataMetadataActive: data,
        });
        console.log(this.state.dataMetadataActive);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.geData(this.state.auth);
  };

  render() {
    const searchMetada = (term) => {
      return function (x) {
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
                this.agregar(aux.id);
              }}
            >
              <i className="fa fa-plus" />
            </button>
          </td>
        </tr>
      );
    });
    return (
      <Modal isOpen={this.state.modal} className="modal-xl">
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
                    onChange={(e) => {
                      this.setState({
                        term: e.target.value,
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
                      <i className="fa fa-exclamation-triangle" /> No hay datos
                      disponibles
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <p>apenas viendo como va la cosa </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({
                modal: false,
              });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { state };
}

const actionCreators = {};

// modifico el connect para que HOC de redux permita accede a la referencia y conecta al modal a Redux
export default connect(mapStateToProps, actionCreators, null, {
  forwardRef: true,
})(ModalAddIndexes);
