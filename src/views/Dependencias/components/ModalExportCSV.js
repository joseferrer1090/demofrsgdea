import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import "./styles/tables_fixed.css";
import { CSVLink } from "react-csv";
import { Parser } from "json2csv";
import { DEPENDENCE_EXPORT } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      dataExport: [],
      t: this.props.t,
      auth: this.props.authorization
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
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
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.getDataExportCSV();
  };

  getDataExportCSV = () => {
    const auth = this.state.auth;
    const username = decode(auth)
    fetch(`${DEPENDENCE_EXPORT}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response =>
        response.json().then(data => {
          this.setState({
            dataExport: data
          });
        })
      )
      .catch(error => console.log(" ", error));
  };

  render() {
    const data = this.state.dataExport;
    const fields = [
      {
        label: "code",
        value: "code"
      },
      {
        label: "name",
        value: "name"
      },
      {
        label: "description",
        value: "description"
      },
      {
        label: "status",
        value: "status"
      },
      {
        label: "code_headquarter",
        value: "codeHeadquarter"
      },
      {
        label: "code_charge",
        value: "codeCharge"
      }
    ];

    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>{t("app_dependencia_modal_export_titulo")}</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>{t("app_dependencia_modal_export_codigo")}</th>
                  <th>{t("app_dependencia_modal_export_nombre")}</th>
                  <th>{t("app_dependencia_modal_export_descripcion")}</th>
                  <th>{t("app_dependencia_modal_export_estado")}</th>
                  <th>{t("app_dependencia_modal_export_sede")}</th>
                  <th>{t("app_dependencia_modal_export_cargo")}</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.code}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.status}</td>
                      <td>{aux.codeHeadquarter}</td>
                      <td>{aux.codeCharge}</td>
                    </tr>
                  ];
                })}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_dependencia_modal_export_boton_cerrar")}{" "}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{" "}
              {t("app_dependencia_modal_export_boton_exportar")}
            </CSVLink>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
ModalExportCSV.propTypes = {
  modalexport: PropTypes.bool.isRequired,
  t: PropTypes.any
};
export default ModalExportCSV;
