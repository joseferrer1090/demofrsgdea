import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  CardBody,
  ListGroup,
  ListGroupItem,
  Badge,
  Spinner,
} from "reactstrap";
import Tabinformaction from "./components/TabProfile";
import { withTranslation } from "react-i18next";
import { decode } from "jsonwebtoken";
import { SEARCH_BY_USERNAME } from "../../../services/EndPoints";
import PhotoUser from "./components/PhotoUser";

const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

class Profle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "/assets/img/avatars/user2.jpg",
      data: [],
      dataRoles: [],
      authToken: "",
      idUser: "",
      spinner: true,
    };
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    this.getDataLocal();
  }

  getDataLocal = () => {
    asyncLocalStorage
      .getItem("user")
      .then((resp) => {
        return JSON.parse(resp);
      })
      .then((resp) => {
        this.getInfoUser(resp.data.access_token);
        this.setState({
          authToken: resp.data.access_token,
        });
      });
  };

  getInfoUser = (auth) => {
    const username = decode(auth);
    fetch(`${SEARCH_BY_USERNAME}/?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
          dataRoles: data.roles,
          // dataRoles: data.charge,
          idUser: data.id,
          spinner: false,
        });
      })
      .catch((Error) => console.log(" ", Error));
  };

  listRoles = () => {
    let lista;
    this.state.dataRoles.map((aux, id) => {
      lista = (
        <ListGroup>
          <ListGroupItem className="justify-content-between">
            {aux.name} <Badge pill>14</Badge>
          </ListGroupItem>
        </ListGroup>
      );
    });
    return lista;
  };

  render() {
    const { t } = this.props;
    const { data } = this.state;
    const { authToken } = this.state;
    const infoUser = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      roles: data.roles,
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="3">
            <div className="card">
              {" "}
              <PhotoUser
                authorization={authToken}
                id={this.state.idUser}
                t={t}
              />
              <CardBody>
                <p className="text-center">
                  {" "}
                  {infoUser.name}{" "}
                  {/* <small className="form-text"> Administrador </small>{" "} */}
                </p>
                <address>
                  <div style={{ margin: "10px " }}>
                    {" "}
                    <p className="text-center">
                      <i className="fa fa-phone-square" />
                      {"   "}
                      {infoUser.phone}
                    </p>
                    <p className="text-center">
                      <i className="fa fa-envelope" /> {"   "} {infoUser.email}
                    </p>
                  </div>
                </address>
              </CardBody>
            </div>

            <div className="card">
              <div className="card-header">
                {" "}
                <i className="icon-lock" /> {t("user_profile_rol_permission")}{" "}
              </div>
              {this.state.dataRoles.map((aux, id) => {
                return (
                  <ListGroup>
                    <ListGroupItem className="justify-content-between">
                      {aux.name}{" "}
                      {aux.status === 1 ? (
                        <span class="badge badge-success badge-pill">
                          Activo
                        </span>
                      ) : (
                        <span class="badge badge-error badge-pill">
                          Inactivo
                        </span>
                      )}
                    </ListGroupItem>
                  </ListGroup>
                );
              })}
            </div>
            {() => this.listRoles()}

            <br />
          </Col>

          <Col sm="9">
            <div className="" style={{ height: "200px" }}>
              <Tabinformaction authorization={authToken} />
            </div>
          </Col>
        </Row>

        <Row />
      </div>
    );
  }
}

Profle.propTypes = {};

export default withTranslation("translations")(Profle);
