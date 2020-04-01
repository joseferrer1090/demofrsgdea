import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";
import Tabinformaction from "./components/TabProfile";
import { withTranslation } from "react-i18next";
import { decode } from "jsonwebtoken";
import { SEARCH_BY_USERNAME } from "../../../services/EndPoints";

const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";

const asyncLocalStorage = {
  setItem: async function(key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function(key) {
    await null;
    return localStorage.getItem(key);
  }
};

class Profle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "/assets/img/avatars/user2.jpg",
      data: [],
      dataRoles: [],
      authToken: ""
    };
    this.inputOpenFileRef = React.createRef();
  }

  onChange = e => {
    let files = e.target.files;
    let dataImg = e.target.files[0];
    console.warn("Data file:", files);
    console.log(e.target.files[0].name);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ image: e.target.result });
      setTimeout(e => {
        alert(`Se modifico con éxito la imagen:
                  name: ${dataImg.name},
                  size: ${dataImg.size},
                  type: ${dataImg.type}`);
      }, 1000);
    };
  };

  componentDidMount() {
    this.getDataLocal();
    // this.getInfoUser();
  }

  // componentDidMount() {
  //   this.getDataLocal();
  // }

  getDataLocal = () => {
    asyncLocalStorage
      .getItem("user")
      .then(resp => {
        return JSON.parse(resp);
      })
      .then(resp => {
        this.getInfoUser(resp.data.access_token);
        this.setState({
          authToken: resp.data.access_token
        });
      });
  };

  getInfoUser = auth => {
    const username = decode(auth);
    fetch(`${SEARCH_BY_USERNAME}/?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // data.roles.map((aux, id) => {
        //   return console.log(aux);
        // });
        this.setState({
          data: data,
          dataRoles: data.roles
        });
      })
      .catch(Error => console.log(" ", Error));
  };
  /* 

  Peticion a get by id user, decode del acces token para tomar id.
  */
  listRoles = () => {
    let lista;
    this.state.dataRoles.map((aux, id) => {
      console.log(aux.name);
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
      roles: data.roles
    };
    // console.log(this.state.dataRoles);
    console.log(authToken);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="3">
            <div className="card">
              {" "}
              <a
                className="text-center"
                onClick={() => {
                  this.inputOpenFileRef.current.click();
                }}
              >
                <img
                  className="img-thumbnail"
                  // className="img-responsive "
                  src={this.state.image}
                  width="150"
                  height="150"
                  style={{ margin: "10px" }}
                />

                <input
                  multiple={false}
                  accept={acceptedFileTypes}
                  type="file"
                  name="file"
                  style={{ display: "none" }}
                  ref={this.inputOpenFileRef}
                  onChange={e => this.onChange(e)}
                />
              </a>
              <CardTitle>
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
              </CardTitle>
            </div>

            <div className="card">
              <div className="card-header">
                {" "}
                <i className="icon-lock" /> {t("user_profile_rol_permission")}{" "}
              </div>
              {this.state.dataRoles.map((aux, id) => {
                // console.log(aux);
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
