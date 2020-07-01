import React, { Component } from "react";
import PropTypes from "prop-types";
import TableStatus from "./components/TableStatusCorrespondence";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { withTranslation } from "react-i18next";

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

class EstadoCorrespondencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: "",
      t: this.props.t,
    };
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
        this.setState({
          authToken: resp.data.access_token,
        });
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  render() {
    const { authToken } = this.state;
    const { t } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardHeader>
                <i className="fa fa-table" />
                {t("app_filing_status_table_titulo")}
              </CardHeader>
              <CardBody>
                <TableStatus authorization={authToken} t={t} />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

EstadoCorrespondencia.propTypes = {};

export default withTranslation("translations")(EstadoCorrespondencia);
