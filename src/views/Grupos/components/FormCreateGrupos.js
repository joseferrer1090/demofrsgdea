import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  CardTitle,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import AsyncSelect from '../../../../node_modules/react-select/lib/AsyncCreatable';
import { strict } from "assert";
import GrupoUsuariosForm from "../Forms/GrupoUsuariosForm";

export const dataGrupoUsuarios=[
  {
    conglomerado:"conglomerado1",
    empresa:"empresa1",
    sede:"sede1",
    dependencia:"dependencia1",
    id:1,
    nombre:"Nombre Usuario 1",
  },
  {
    conglomerado:"conglomerado2",
    empresa:"empresa2",
    sede:"sede2",
    dependencia:"dependencia2",
    id:2,
    nombre:"Nombre Usuario 2",
  },
  {
    conglomerado:"conglomerado3",
    empresa:"empresa3",
    sede:"sede3",
    dependencia:"dependencia3",
    id:3,
    nombre:"Nombre Usuario 3",
  },
  {
    conglomerado:"conglomerado4",
    empresa:"empresa4",
    sede:"sede4",
    dependencia:"dependencia4",
    id:4,
    nombre:"Nombre Usuario 4",
  },
  {
    conglomerado:"conglomerado5",
    empresa:"empresa5",
    sede:"sede5",
    dependencia:"dependencia5",
    id:5,
    nombre:"Nombre Usuario 5",
  }
];

const dataGrupoUsers = {
  codigo: "",
  nombre: "",
  descripcion: "",
};

const filtraritems = [];

class FormCreateGrupos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOk: false,
      items:dataGrupoUsuarios,
      selectedOptionUserAsigandos: null
    };
  }

handleChangeSelectedOptionUsers = selectedOptionUserAsigandos => {
  this.setState({ selectedOptionUserAsigandos });
  console.log(this.state.selectedOptionUserAsigandos);
};

  render() {
    const {dataOk, items, selectedOptionUserAsigandos} = this.state;
    const buscarOpciones = items.map(item => (
      <option
        key={item.id}
        onClick={() => {
        const string = JSON.stringify({
          value: `${item.id}`,
          label: `${item.nombre}`
        });
        filtraritems.push(JSON.parse(string));
        console.log(filtraritems);
      }}
    >
      {item.nombre}
    </option>
        ));
    console.log(filtraritems);

    return (
      <div className="animated fadeIn">
        <div className="container">
          <GrupoUsuariosForm grupoUsuarios={dataGrupoUsers}/>
        </div>
      </div>
    );
  }
}
export default FormCreateGrupos;
