import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Jumbotron,
  Card,
  CardTitle,
  CardText
} from "reactstrap";
import Img1 from "./../../assets/img/proceso-de-gestion-documental.svg";
import "./../../css/custom_css.css";

class Configuracion extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <div>
          <h2 className="display-5">Hola, administrador, Bienvenido</h2>
          <hr />
        </div>
        <div className="card">
          <section className="showcase">
            <div className="container-fluid p-0">
              <div className="row no-gutters">
                <div
                  className="col-lg-6 order-lg-2 text-white showcase-img"
                  style={{
                    backgroundImage:
                      "url(" + "assets/img/GESTIONDOCUMENTAL.jpg" + ")",
                    height: "480px"
                  }}
                />
                <div className="col-lg-6 order-lg-2 my-auto showcase-text">
                  <div className="container">
                    <h2>Gestión documental</h2>
                    <p className="lead mb-0 text-justify">
                      La gestión documental o gestión de documentos, es el
                      conjunto de normas técnicas y prácticas usadas para
                      administrar los documentos de todo tipo, recibidos y
                      creados en una organización, facilitar la recuperación de
                      información desde ellos, determinar el tiempo que los
                      documentos deben guardarse, eliminar los que ya no sirven
                      y asegurar la conservación a largo plazo de los documentos
                      más valiosos, aplicando principios de racionalización y
                      economía.
                      <br />
                      <br /> Es una actividad casi tan antigua como la
                      escritura, que nació debido a la necesidad de "documentar"
                      o fijar actos administrativos y transacciones legales y
                      comerciales por escrito para dar fe de los hechos. Este
                      tipo de documentos se plasmaron sucesivamente en tablillas
                      de arcilla, hojas de papiro, pergaminos y papel, cuya
                      gestión se fue haciendo cada vez más compleja a medida que
                      crecía el tamaño de los fondos documentales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid p-0">
              <div className="row no-gutters">
                <div className="col-lg-6 order-lg-2 my-auto showcase-text">
                  <div className="container">
                    <h2>
                      ¿Qué es un Sistema de Gestión de Documentos Electrónicos
                      de Archivo - SGDEA?
                    </h2>
                    <p className="lead mb-0 text-justify">
                      Las tecnologías de la información y las
                      telecomunicaciones, están introduciendo nuevas prácticas y
                      formas de gestionar los documentos y se han vuelto una
                      herramienta fundamental para el acceso, consulta,
                      transparencia, optimización y disponibilidad de la
                      información. Sin embargo, es necesario establecer
                      políticas claras acerca de la producción, distribución,
                      consulta, retención, almacenamiento, preservación y
                      disposición final, pues cada decisión asociada al
                      tratamiento de dichos documentos tendrá efectos sobre el
                      patrimonio documental. La industria ha ido evolucionando,
                      las tecnologías han madurado y a través de este proceso de
                      maduración se han incorporado nuevos conceptos y
                      acrónimos, cada uno con distintos propósitos y
                      significados.
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-6 order-lg-2 text-white showcase-img"
                  style={{
                    backgroundImage:
                      "url(" + "assets/img/bigstock_folder.jpg" + ")",
                    height: "480px"
                  }}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Card body>
              <CardTitle className="text-center">
                Manual módulo de correspondencia
              </CardTitle>
              <div className="text-center">
                <img src="./../../assets/img/envelope.svg" width="150" />
              </div>
              <br />
              <CardText className="text-justify">
                Si deseas saber como funciona el módulo de correspondencia y
                todas sus funcionalidades presiona el boton
              </CardText>
              <Button>
                <i className="fa fa-download" /> Descargar
              </Button>
            </Card>
          </div>
          <div className="col-md-4">
            <Card body>
              <CardTitle className="text-center">
                Manual módulo de archivo
              </CardTitle>
              <div className="text-center">
                <img src="./../../assets/img/server.svg" width="150" />
              </div>
              <br />
              <CardText className="text-justify">
                Si deseas saber como funciona el módulo de archivo y todas sus
                funcionalidades presiona el boton
              </CardText>
              <Button>
                <i className="fa fa-download" /> Descargar
              </Button>
            </Card>
          </div>
          <div className="col-md-4">
            <Card body>
              <CardTitle className="text-center">
                Manual módulo de workflow
              </CardTitle>
              <div className="text-center">
                <img src="./../../assets/img/workflow.svg" width="150" />
              </div>
              <br />
              <CardText className="text-justify">
                Si deseas saber como funciona el módulo de workflow y todas sus
                funcionalidades presiona el boton
              </CardText>
              <Button>
                {" "}
                <i className="fa fa-download" /> Descargar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Configuracion;
