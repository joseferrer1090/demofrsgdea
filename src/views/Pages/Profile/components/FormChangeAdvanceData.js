import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  ListGroupItem,
  ListGroup
} from "reactstrap";
import { withTranslation } from "react-i18next";
import { SEARCH_BY_USERNAME } from "../../../../services/EndPoints";
import { decode } from "jsonwebtoken";
class FormChangeAdvanceData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.authorization,
      dataPut: {
        conglomerado: "",
        empresa: "",
        sede: "",
        dependencia: "",
        cargo: "",
        roles: "",
        permisos: ""
      },
      dataRoles: []
    };
  }
  static getDerivedStaticFromProps(props, state) {
    if (props.auhorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
      setTimeout(() => {
        this.getProfileByID();
      }, 1000);
    }
  }

  getProfileByID = () => {
    const auth = this.state.auth;
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
        console.log(data);
        this.setState({
          dataPut: {
            conglomerado: data.dependence.headquarter.company.conglomerate.name,
            empresa: data.dependence.headquarter.company.name,
            sede: data.dependence.headquarter.name,
            dependencia: data.dependence.name,
            cargo: data.charge.name,
            roles: "",
            permisos: ""
          },
          dataRoles: data.roles
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  render() {
    const { t } = this.props;
    const { dataPut } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-8 offset-md-2  ">
            <Card>
              <CardHeader>{t("user_profile_tab_2")}</CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td>
                          {" "}
                          {t(
                            "user_profile_tab_2_from_data_2_congolomerado"
                          )}:{" "}
                        </td>
                        <td> {dataPut.conglomerado}</td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          {t("user_profile_tab_2_from_data_2_empresa")}:{" "}
                        </td>
                        <td> {dataPut.empresa}</td>
                      </tr>
                      <tr>
                        <td> {t("user_profile_tab_2_from_data_2_sede")}: </td>
                        <td>{dataPut.sede} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          {t("user_profile_tab_2_from_data_2_dependencia")}:
                        </td>
                        <td> {dataPut.dependencia}</td>
                      </tr>
                      <tr>
                        <td>{t("user_profile_tab_2_from_data_2_cargo")}:</td>
                        <td>{dataPut.cargo} </td>
                      </tr>
                      <tr>
                        <td>{t("user_profile_tab_2_from_data_2_roles")}:</td>
                        {/* <br /> */}
                        <td>
                          {" "}
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
                          })}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("user_profile_tab_2_from_data_2_permisos")}:</td>
                        <td> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translations")(FormChangeAdvanceData);
