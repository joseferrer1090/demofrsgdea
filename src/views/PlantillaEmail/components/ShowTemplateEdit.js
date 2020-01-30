import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Spinner
} from "reactstrap";

class ShowTemplateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      template: this.props.template,
      auth: this.props.authorization,
      id: this.props.id,
      spinner: true
    };
  }

  Loadingspinner = () => {
    const { spinner } = this.state;
    if (spinner === true) {
      return (
        <center>
          <Spinner
            style={{ width: "3rem", height: "3rem" }}
            type="grow"
            color="primary"
          />
        </center>
      );
    } else if (spinner === false) {
      return null;
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    setTimeout(() => {
      document.getElementById("divView").innerHTML = this.props.template;
      this.setState({ spinner: false });
    }, 1000);
  };

  render() {
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Vista previa</ModalHeader>
          <ModalBody>
            {this.Loadingspinner()}
            <div id="divView"></div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false, spinner: true });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
ShowTemplateEdit.propTypes = {
  modal: PropTypes.bool.isRequired,
  template: PropTypes.string.isRequired
};
export default ShowTemplateEdit;
