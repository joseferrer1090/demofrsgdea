import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput
} from "reactstrap";
// import DatePicker from "react-datepicker";
// import "./../../../../node_modules/react-datepicker/dist/react-datepicker.css";
// import "./../../../css/custom_calendar.css";
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

const FormCreateUser = () => {
  return (
    <div className="animated fadeIn">
      <div className="git">
        <Row>
          <Col sm="10" md={{ offset: 1 }}>
            <UserForm user={user} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormCreateUser;
