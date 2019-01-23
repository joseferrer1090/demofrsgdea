import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CustomModalTable2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalcustom2
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Personalizar tabla </ModalHeader>
        <ModalBody>
          <div className="">
            <div className="row">
              <div className="col-md-12">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr className="text-center">
                      <th>Base datos </th>
                      <th>Personalizado </th>
                      <th>Estado </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>
                        {" "}
                        <code>id</code>{" "}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />{" "}
                      </td>
                      <td>
                        {" "}
                        <input type="checkbox" checked />{" "}
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <code>code </code>
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />{" "}
                      </td>
                      <td>
                        {" "}
                        <input type="checkbox" />{" "}
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <code>name </code>
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />{" "}
                      </td>
                      <td>
                        {" "}
                        <input type="checkbox" />{" "}
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <code> description </code>
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />{" "}
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary">
            {" "}
            <i className="fa fa-pencil" /> Personalizar{" "}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

CustomModalTable2.propTypes = {
  modalcustom2: PropTypes.bool.isRequired
};

export default CustomModalTable2;
