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
  conglomerateId: "",
  companyId: "",
  headquarterId: "",
  code: "",
  name: "",
  description: "",
  chargeId: "",
  status: ""
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
