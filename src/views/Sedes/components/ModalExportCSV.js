import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./styles/table_fixed.css";
import { CSVLink } from "react-csv";
import { Parser } from "json2csv";
import { HEADQUARTER_EXPORT } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      dataExport: [],
      t: this.props.t,
      username: "",
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
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
    const username = decode(auth);
    fetch(`${HEADQUARTER_EXPORT}?username=${username.user_name}`, {
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
        label: "Code",
        value: "code"
      },
      {
        label: "Name",
        value: "name"
      },
      {
        label: "Description",
        value: "description"
      },
      {
        label: "Prefix",
        value: "prefix"
      },
      {
        label: "Sequence",
        value: "sequence"
      },
      {
        label: "Address",
        value: "address"
      },
      {
        label: "Phone",
        value: "phone"
      },
      {
        label: "Status",
        value: "status"
      },
      {
        label: "Code_Company",
        value: "codeCompany"
      },
      {
        label: "Code_Charge",
        value: "codeCharge"
      },
      {
        label: "Code_City",
        value: "codeCity"
      }
    ];

    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>{t("app_sedes_modal_export_titulo")}</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>{t("app_sedes_modal_export_codigo")}</th>
                  <th>{t("app_sedes_modal_export_nombre")}</th>
                  <th>{t("app_sedes_modal_export_descripcion")}</th>
                  <th>{t("app_sedes_modal_export_pref_radicacion")}</th>
                  <th>{t("app_sedes_modal_export_sec_radicacion")}</th>
                  <th>{t("app_sedes_modal_export_direccion")}</th>
                  <th>{t("app_sedes_modal_export_telefono")}</th>
                  <th>{t("app_sedes_modal_export_estado")}</th>
                  <th>{t("app_sedes_modal_export_empresa")}</th>
                  <th>{t("app_sedes_modal_export_cargo")}</th>
                  <th>{t("app_sedes_modal_export_ciudad")}</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.code}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.prefix}</td>
                      <td>{aux.sequence}</td>
                      <td>{aux.address}</td>
                      <td>{aux.phone}</td>
                      <td>{aux.status}</td>
                      <td>{aux.codeCompany}</td>
                      <td>{aux.codeCharge}</td>
                      <td>{aux.codeCity}</td>
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
              {t("app_sedes_modal_export_boton_cerrar")}{" "}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{" "}
              {t("app_modal_export_boton_exportar")}
            </CSVLink>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
ModalExportCSV.propTypes = {
  modal: PropTypes.bool.isRequired,
  t: PropTypes.any.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalExportCSV;
