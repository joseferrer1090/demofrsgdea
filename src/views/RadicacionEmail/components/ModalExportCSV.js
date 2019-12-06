import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import "./styles/table_fixed.css";
import { CSVLink, CSVDownload } from "react-csv";
import { Parser } from "json2csv";

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      dataExport: [],
      t: this.props.t,
      username: "ccuartas"
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.getDataExportCSV();
  };

  // componentDidMount() {
  //   this.getDataExportCSV();
  // }

  getDataExportCSV = () => {
    fetch(
      `http://192.168.10.180:8090/api/sgdea/service/configuration/email/accounts/filing/export/data?username=${this.state.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzUzMDk3MzYsInVzZXJfbmFtZSI6ImNjdWFydGFzIiwiYXV0aG9yaXRpZXMiOlsiQVNJU1RFTlRFIEFETUlOSVNUUkFUSVZPIl0sImp0aSI6ImY4MGU3Njg4LWM0YjQtNDJlNS04ZWM5LWYyMWU2MDUwYzQ0NyIsImNsaWVudF9pZCI6ImZyb250ZW5kYXBwIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.-qYzRQYh7B4Si7NwfJUQGjh1L1jHxdeld8XK_hh8GMo"
        }
      }
    )
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
    console.log(data);
    const fields = [
      {
        label: "protocol",
        value: "protocol"
      },
      {
        label: "host",
        value: "host"
      },
      {
        label: "port",
        value: "port"
      },
      {
        label: "email",
        value: "email"
      },
      {
        label: "status",
        value: "status"
      }
    ];

    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    // console.log(csv);
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_radicacion_email_modal_export_titulo")}
          </ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>
                    {t("app_radicacion_email_modal_export_table_protocol")}
                  </th>
                  <th>{t("app_radicacion_email_modal_export_table_host")}</th>
                  <th>{t("app_radicacion_email_modal_export_table_puerto")}</th>
                  <th>{t("app_radicacion_email_modal_export_table_email")}</th>
                  <th>{t("app_radicacion_email_modal_export_table_estado")}</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  const statusRadicacionEmail = data => {
                    let status;
                    if (data === true) {
                      status = (
                        <b className="text-success">
                          {" "}
                          {t("app_tablas_estado_activo")}
                        </b>
                      );
                    } else if (data === false) {
                      status = (
                        <b className="text-danger">
                          {" "}
                          {t("app_tablas_estado_inactivo")}
                        </b>
                      );
                    }
                    return status;
                  };
                  return [
                    <tr key={id}>
                      <td>{aux.protocol}</td>
                      <td>{aux.host}</td>
                      <td>{aux.port}</td>
                      <td>{aux.email}</td>
                      <td>{statusRadicacionEmail(aux.status)}</td>
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
              {t("app_radicacion_email_modal_export_table_boton_cerrar")}{" "}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{" "}
              {t("app_radicacion_email_modal_export_table_boton_exportar")}
            </CSVLink>
            {/* <CSVDownload className="btn btn-secondary btn-sm" data={records}>
              {" "}
              <i className="fa fa-download" /> Exportar CSV{" "}
            </CSVDownload> */}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

// ModalExportCSV.propTypes = {
//   modal: PropTypes.bool.isRequired
// };

export default ModalExportCSV;
