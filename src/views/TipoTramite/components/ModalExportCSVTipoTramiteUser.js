import React, { Component, Fragment, useState, useEffect } from 'react';
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
      username: 'ccuartas', 
      tipoTramite: ""
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
      // console.log(this.state.tipoTramite);
    return (
      <Fragment>
        <Modal className="modal-xl" isOpen={this.state.modal}>
          <ModalHeader>
           Exportar usuarios por tipo de tramite
          </ModalHeader>
          <ModalBody>
             <SelectTipoTramite value={this.state.tipoTramite} onChange={(e) =>{this.setState({ tipoTramite: e.target.value  })}} />
           <div className="row">
               <div className="col-md-12">
               <TableCSV id={this.state.tipoTramite}/>
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

const SelectTipoTramite = (props) => {
    
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("jferrer");


    useEffect(() => {
      fetch(`http://192.168.20.187:7000/api/sgdea/typeprocedure/active?username=${username}`, 
        {
            method: "GET", 
            headers:{
                "Content-Type": "application/json", 
                Authorization: "Basic " + window.btoa('sgdea:123456')
            }
        }).then(response => response.json()).then(data => {
            setData(data);
        }).catch(err => console.log("Error", err));
    }, [username])
    return(
          <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label" style={{paddingLeft: "70px"}}>Tipo de tramite <span className="text-danger">*</span> :</label>
                <div className="col-sm-8">
                        <select className="form-control form-control-sm" value={props.value} onChange={props.onChange}>
                            <option disabled value="">Seleccione tipo de tramite</option>
                            {
                                data.map((aux, id) => {
                                    return(
                                        <option key={id}  value={aux.id}>{aux.name}</option>
                                    )
                                } )
                            }
                        </select>
                </div>
            </div>
    )
}

class TableCSV extends React.Component {
    state = {
        data: [], 
        idTipoTramite: this.props.id, 
        username: "jferrer"
    }

    getDataTipoTramiteByUser = () => {
        fetch(`http://192.168.20.187:7000/api/sgdea/typeprocedure/export/${this.props.id}/users?username=${this.state.username}`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + window.btoa('sgdea:123456')
            }
        }).then(response => response.json()).then(data => {
            this.setState({
                data: data
            })
        }).catch(err => console.log("Error", err));
    }

    static getDerivedStateFromProps(props, state){
        if(props.id !== state.idTipoTramite ){
            return{
                idTipoTramite: props.id
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.id !== prevProps.id){
            this.getDataTipoTramiteByUser();
        }
    }

    componentDidMount() {
        this.getDataTipoTramiteByUser();
    }

    render() {
        // console.log(this.state.data);
        return (
           <div>
               <table className="table table-responsive table-bordered  table-hover table-striped fixed_header">
                <thead className="">
                    <tr className="">
                    <th>
                    CodeTypeProcedure
                    </th>
                    <th>
                     Email
                    </th>
                    <th>
                    Identificacion
                    </th>
                    <th>
                    Nombre
                    </th>
                    <th>
                    Original
                    </th>     
                    </tr>
                </thead>
              <tbody className="text-justify">
                {
                  (Object.keys(this.state.data).length === 0) ?  (<p className="text-center"> No hay dato para generar el CSV  </p>):
                  
                  (this.state.data.map((aux, id) => {
                    return(
                      <tr>
                        <td>{aux.codeTypeProcedure}</td>
                        <td>{aux.email}</td>
                        <td>{aux.identification}</td>
                        <td>{aux.name}</td>
                        <td>{aux.original}</td>
                      </tr>
                    )
                  }))
                }
              </tbody>
            </table>
           </div>
        );
    }
}