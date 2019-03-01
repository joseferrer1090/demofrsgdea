import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import PropTypes from "prop-types";

class ModalEditTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledittheme
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Editar tema seleccionado </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <Card>
                  <CardHeader>Header</CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>Body</CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>Footer</CardHeader>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <CardHeader>Otros componentes</CardHeader>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="float-right">
              <button className="btn btn-secondary">
                {" "}
                <i className="fa fa-pencil" /> Editar tema{" "}
              </button>
              &nbsp;
              <button
                className="btn btn-secondary"
                onClick={() => {
                  this.setState({ modal: false });
                }}
              >
                {" "}
                <i className="fa fa-times" /> Cancelar{" "}
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditTheme.propTypes = {
  modaledittheme: PropTypes.bool.isRequired
};

export default ModalEditTheme;
