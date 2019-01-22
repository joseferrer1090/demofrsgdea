import React, { Component } from "react";
import PropType from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import Select from "react-select";

const dataExample = [
  { value: "codigo", label: "Codigo" },
  { value: "nombre", label: "Nombre" },
  { value: "descripcion", label: "Descripcion" }
];

class CustomModalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalcustom,
      selectMultiple: null
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleChangeSelectMultiple = selectMultiple => {
    this.setState({ selectMultiple });
  };

  render() {
    const { selectMultiple } = this.state;
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Personalizar tabla </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <ListGroup>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      1. Selecciona los datos a mostrar en la tabla
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <Select
                        value={selectMultiple}
                        onChange={this.handleChangeSelectMultiple}
                        options={dataExample}
                        isMulti
                      />
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      2. Tabla de consulta
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      La tabla de origen de los datos{" "}
                      <select className="form-control" disabled>
                        {" "}
                        <option> tbl-conglomerarado </option>{" "}
                      </select>
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      3. Organizar los datos
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      Puedes organizar el orden en que apareceran en la tabla
                      <select className="form-control">
                        {" "}
                        <option> ASC - Ascendente </option>{" "}
                        <option> DESC - Descendente </option>{" "}
                      </select>
                    </ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>
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
            type="button"
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

CustomModalTable.propType = {
  modal: PropType.bool.isRequired
};

export default CustomModalTable;
