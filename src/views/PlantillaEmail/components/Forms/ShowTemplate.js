import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from "reactstrap";

class ShowTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      template: this.props.template
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });

    setTimeout(() => {
      document.getElementById("divView").innerHTML = this.props.template;
    }, 1000);
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Vista previa</ModalHeader>
          <ModalBody>
            <div id="divView"></div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              Close
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
ShowTemplate.propTypes = {
  modal: PropTypes.bool.isRequired,
  template: PropTypes.string.isRequired
};
export default ShowTemplate;
