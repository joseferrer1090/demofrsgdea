import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import UserForm from "./Forms/UserForm";

const user = {
  identificacion: "",
  nombre: "",
  email: "",
  telefono: "",
  direccion: "",
  f_d_nacimiento: "",
  conglomeradoID: "",
  empresaID: "",
  sedeID: "",
  dependenciaID: "",
  cargoID: "",
  username: "",
  password: "",
  confirm_password: "",
  rolesID: [],
  estado: false,
  foto: undefined
};

const FormCreateUser = props => {
  return (
    <div className="animated fadeIn">
      <div className="git">
        <Row>
          <Col sm="10" md={{ offset: 1 }}>
            <UserForm user={user} authorization={props.authorization} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

FormCreateUser.propTypes = {
  user: PropTypes.object.isRequired
};

export default FormCreateUser;
