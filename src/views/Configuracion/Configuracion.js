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
import { withTranslation } from "react-i18next";
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
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <div>
          <h2 className="display-5">{t("welcome_home")}, usuario</h2>
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
                    <h2>{t("title_home_1")}</h2>
                    <p className="lead mb-0 text-justify">
                      {t("text_home_1_1")}
                      <br />
                      <br />
                      {t("text_home_1_2")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid p-0">
              <div className="row no-gutters">
                <div className="col-lg-6 order-lg-2 my-auto showcase-text">
                  <div className="container">
                    <h2>{t("title_home_2")}</h2>
                    <p className="lead mb-0 text-justify">
                      {t("text_home_2_1")}
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
                {t("title_home_1_2")}
              </CardTitle>
              <div className="text-center">
                <img src="./../../assets/img/envelope.svg" width="150" />
              </div>
              <br />
              <CardText className="text-justify">
                {t("text_home_1_2_1")}
              </CardText>
              <Button>
                <i className="fa fa-download" /> {t("text_button_1_2_1")}
              </Button>
            </Card>
          </div>
          <div className="col-md-4">
            <Card body>
              <CardTitle className="text-center">
                {t("title_home_1_3")}
              </CardTitle>
              <div className="text-center">
                <img src="./../../assets/img/server.svg" width="150" />
              </div>
              <br />
              <CardText className="text-justify">
                {t("text_home_1_3_1")}
              </CardText>
              <Button>
                <i className="fa fa-download" /> {t("text_button_1_3_1")}
              </Button>
            </Card>
          </div>
          <div className="col-md-4">
            <Card body>
              <CardTitle className="text-center">
                {t("title_home_1_4")}
              </CardTitle>
              <div className="text-center">
                <img src="./../../assets/img/workflow.svg" width="150" />
              </div>
              <br />
              <CardText className="text-justify">
                {t("text_home_1_4_1")}
              </CardText>
              <Button>
                {" "}
                <i className="fa fa-download" /> {t("text_button_1_4_1")}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translations")(Configuracion);
