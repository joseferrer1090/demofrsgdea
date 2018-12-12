import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import PropTypes from "prop-types";

class ModalViewConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewstate
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader> Conglomerado </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Dato1</td>
                    <td> dato1 </td>
                  </tr>
                  <tr>
                    <td>Dato2</td>
                    <td>Dato2</td>
                  </tr>
                  <tr>
                    <td>Dato3</td>
                    <td>Dato3</td>
                  </tr>
                  <tr>
                    <td>Dato4</td>
                    <td>Dato4</td>
                  </tr>
                  <tr>
                    <td>Dato5</td>
                    <td>Dato5</td>
                  </tr>
                  <tr>
                    <td>Dato6</td>
                    <td>Dato6</td>
                  </tr>
                  <tr>
                    <td>Dato7</td>
                    <td>Dato7</td>
                  </tr>
                  <tr>
                    <td>Dato8</td>
                    <td>Dato8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-outline-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewConglomerado.propTypes = {
  modalviewstate: PropTypes.bool.isRequired
};

export default ModalViewConglomerado;
