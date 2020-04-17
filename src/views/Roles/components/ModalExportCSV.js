import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { Parser } from "json2csv";
import { ROLES_EXPORT } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport,
      dataExport: [],
      username: "ccuartas",
      t: this.props.t,
      auth: this.props.authorization
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.getDataExportCSV();
  };

  getDataExportCSV = () => {
    const token = this.props.authorization;
    const username = decode(token);
    fetch(`${ROLES_EXPORT}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
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
        label: "status",
        value: "status"
      }
    ];

    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>{t("app_roles_modal_export_titulo")}</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr className="">
                  <th>{t("app_roles_modal_export_codigo")}</th>
                  <th>{t("app_roles_modal_export_nombre")}</th>
                  <th>{t("app_roles_modal_export_descripcion")}</th>
                  <th>{t("app_roles_modal_export_estado")}</th>
                </tr>
              </thead>
              <tbody className="text-justify">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.code}</td>
                      <td>{aux.name}</td>
                      <td>{aux.description}</td>
                      <td>{aux.status}</td>
                    </tr>
                  ];
                })}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{" "}
              {t("app_roles_modal_export_boton_exportar")}
            </CSVLink>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_roles_modal_export_boton_cerrar")}
            </button>
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
