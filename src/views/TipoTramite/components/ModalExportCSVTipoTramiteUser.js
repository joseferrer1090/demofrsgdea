import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
//import './styles/table_fixed.css';
import { CSVLink, CSVDownload } from 'react-csv';
import { Parser } from 'json2csv';
import { Trans } from 'react-i18next';

class ModalExportCSVTipoTramiteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport2,
      dataExport: [],
      t: this.props.t,
      username: 'ccuartas'
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Fragment>
        <Modal className="modal-xl" isOpen={this.state.modal}>
          <ModalHeader>
           Exportar usuarios por tipo de tramite
          </ModalHeader>
          <ModalBody>
           <div className="">
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label" style={{paddingLeft: "70px"}}>Tipo de tramite <span className="text-danger">*</span> :</label>
                <div className="col-sm-8">
                     <select className="form-control form-control-sm">
                         <option>Seleccione</option>
                     </select>
                </div>
            </div>
           </div>
           <div className="row">
               <div className="col-md-12">
                <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
                <thead className="">
                    <tr className="">
                    <th>
                    código
                    </th>
                    <th>
                        nombre
                    </th>
                    <th>
                    descripción
                    </th>
                    <th>
                    respuesta
                    </th>
                    <th>
                    Asunto
                    </th>     
                    </tr>
                </thead>
              <tbody className="text-justify">
               
              </tbody>
            </table>
               </div>
           </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {' '}
              <i className="fa fa-times" />{' '}
              cerrar{' '}
            </button>

            <button className="btn btn-secondary btn-sm"> Exportar  </button>
            {/* <CSVLink data={csv} className="btn btn-secondary btn-sm">
              <i className="fa fa-download" />{' '}
              Exportar csv
            </CSVLink> */}
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

ModalExportCSVTipoTramiteUser.propTypes = {
  t: PropTypes.any
};

export default ModalExportCSVTipoTramiteUser;