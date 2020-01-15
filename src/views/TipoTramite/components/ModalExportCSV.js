import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
//import './styles/table_fixed.css';
import { CSVLink, CSVDownload } from "react-csv";
import { Parser } from "json2csv";
import { Trans } from "react-i18next";
import { TYPEPROCEDURES_EXPORT } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: this.props.t,
      modal: this.props.modalexport,
      dataExport: [],
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

  // componentDidMount() {
  //   this.getDataExportCSV();
  // }

  getDataExportCSV = () => {
    const { auth } = this.state;
    const username = decode(auth);
    fetch(`${TYPEPROCEDURES_EXPORT}?username=${username.user_name}`, {
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
        label: "answerDays",
        value: "answerDays"
      },
      {
        label: "issue",
        value: "issue"
      },
      {
        label: "status",
        value: "status"
      },
      {
        label: "typeCorrespondence",
        value: "typeCorrespondence"
      },
      {
        label: "codeTemplate",
        value: "codeTemplate"
      }
    ];

    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    // console.log(csv);
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>{t("app_tipoTramite_exportar_titulo")}</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr className="">
                  <th>{t("app_tipoTramite_exportar_codigo")}</th>
                  <th>{t("app_tipoTramite_exportar_nombre")}</th>
                  <th>{t("app_tipoTramite_exportar_descripcion")}</th>
                  <th>{t("app_tipoTramite_exportar_respuesta")}</th>
                  <th>{t("app_tipoTramite_exportar_asunto")}</th>
                  <th>{t("app_tipoTramite_exportar_estado")}</th>
                  <th>{t("app_tipoTramite_exportar_tipo_correspondencia")}</th>
                  <th>{t("app_tipoTramite_exportar_codigo_plantilla")}</th>
                </tr>
              </thead>
              <tbody className="text-justify">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.code}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.answerDays}</td>
                      <td>{aux.issue}</td>
                      <td>{aux.status}</td>
                      <td>{aux.typeCorrespondence}</td>
                      <td>{aux.codeTemplate}</td>
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
              {t("app_tipoTramite_exportar_boton_cerrar")}{" "}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{" "}
              {t("app_tipoTramite_exportar_boton_exportar")}
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

ModalExportCSV.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalExportCSV;
