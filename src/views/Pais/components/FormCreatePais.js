import React, { Component } from "react";
import PropTypes from "prop-types";
import FormPais from "./Forms/FormPais";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  CustomInput
} from "reactstrap";
const dataPais ={
  codigo:"",
  nombre:"",
  estado:""
}
const FormCreatePais =()=>{
  return (
    <div className="animated fadeIn">
      <FormPais pais={dataPais}/>
    </div>
  );
}

export default FormCreatePais;
