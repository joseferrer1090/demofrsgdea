import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import "./styles/table_fixed.css";
import { CSVLink } from "react-csv";
import { Parser } from "json2csv";
import { MESSENGER_EXPORT } from "../../../services/EndPoints";
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.getDataExportCSV();
  };

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

  getDataExportCSV = () => {
    const auth = this.state.auth;
    const username = decode(auth);

    fetch(`${MESSENGER_EXPORT}?username=${username.user_name}`, {
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
        label: "identification",
        value: "identification"
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
      }
    ];

    const json2csvParser = new Parser({ fields, quote: "" });
    const csv = json2csvParser.parse(data);
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>{t("app_mensajero_modal_export_titulo")}</ModalHeader>
          <ModalBody>
            <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
              <thead className="">
                <tr>
                  <th>
                    {t("app_mensajero_modal_export_table_identificacion")}
                  </th>
                  <th>{t("app_mensajero_modal_export_table_nombre")}</th>
                  <th>{t("app_mensajero_modal_export_table_descripcion")}</th>
                  <th>{t("app_mensajero_modal_export_table_estado")}</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((aux, id) => {
                  return [
                    <tr key={id}>
                      <td>{aux.identification}</td>
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
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_mensajero_modal_export_table_boton_cerrar")}{" "}
            </button>

            <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{" "}
              {t("app_mensajero_modal_export_table_boton_exportar")}
            </CSVLink>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

ModalExportCSV.propTypes = {
  modal: PropTypes.bool.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalExportCSV;
