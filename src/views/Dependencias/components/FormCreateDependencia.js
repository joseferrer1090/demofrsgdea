import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Row,
  Col,
  Buttom,
  CustomInput
} from "reactstrap";
import DependenciaForm from "./Forms/DependenciasForm";

const dataDependencia = {
  conglomerado: "",
  empresa: "",
  sede: "",
  codigo: "",
  nombre: "",
  descripcion: "",
  c_responsable: "",
  estado: ""
};

const FromCreateDependencia = () => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <DependenciaForm dependencia={dataDependencia} />
      </div>
    </div>
  );
};

export default FromCreateDependencia;
