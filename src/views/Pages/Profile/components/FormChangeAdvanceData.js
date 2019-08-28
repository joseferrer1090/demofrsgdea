import React, { Component } from "react";
import { Card, Row, Col, CardBody, CardHeader } from "reactstrap";
import { withNamespaces } from "react-i18next";
class FormChangeAdvanceData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { t } = this.props;
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
                        <td> </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          {t("user_profile_tab_2_from_data_2_empresa")}:{" "}
                        </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td> {t("user_profile_tab_2_from_data_2_sede")}: </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          {t("user_profile_tab_2_from_data_2_dependencia")}:
                        </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td>{t("user_profile_tab_2_from_data_2_cargo")}:</td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td>{t("user_profile_tab_2_from_data_2_roles")}:</td>
                        <td> </td>
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

export default withNamespaces("translations")(FormChangeAdvanceData);
