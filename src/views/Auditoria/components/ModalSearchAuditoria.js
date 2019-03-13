import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalSearchAuditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalSearch
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modalSearch
    }));
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            <h5>Consultar auditoría</h5>
          </ModalHeader>
          <ModalBody>
            <form className="">
              <div className="row">
                <div className="col">
                  <label>Desde</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    placeholder="Desde"
                  />
                </div>
                <div className="col">
                  <label>Hasta</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    placeholder="Hasta"
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col">
                  <label>Acciones</label>
                  <select
                    id="acciones"
                    name="acciones"
                    className="form-control form-control-sm"
                  >
                    <option value="grabar">Grabar</option>
                    <option value="actualizar">Actualizar</option>
                    <option value="eliminar">Eliminar</option>
                  </select>
                </div>
                <div className="col">
                  <label>Usuarios</label>
                  <select
                    id="usuarios"
                    name="usuarios"
                    className="form-control form-control-sm"
                  >
                    <option value="T">&lt;&lt; Todos &gt;&gt;</option>
                    <optgroup label="Administradores" title="Administradores">
                      <option value="T1">
                        &lt;&lt; Todos los administradores &gt;&gt;
                      </option>
                      <option value="admarchivo|admon">
                        ADMINISTRADOR DE ARCHIVO
                      </option>
                      <option value="admworkflow|admon">
                        ADMINISTRADOR DE WORKFLOW
                      </option>
                      <option value="admsistema|admon">
                        ADMINISTRADOR DEL SISTEMA
                      </option>
                      <option value="admon|admon">
                        Usuario Administrador General
                      </option>
                    </optgroup>
                    <optgroup label="Usuarios " title="Usuarios">
                      <option value="T2">
                        &lt;&lt; Todos los usuarios &gt;&gt;
                      </option>
                      <option value="ALBCAM|usu">
                        ALBA INES CAMACHO CASAS
                      </option>
                      <option value="ALEVIA|usu">
                        ALEJANDRO VIAFARA GOMEZ
                      </option>
                      <option value="AMABEL|usu">
                        AMANDA PATRICIA BELTRAN SUAREZ
                      </option>
                      <option value="ANAGAR|usu">ANA ISABEL GARCIA</option>
                      <option value="ANDCAB|usu">ANDRES CABRERA RAMIREZ</option>
                      <option value="ASEGURAMIENTO|usu">
                        ASEGURAMIENTO Y CALIDAD
                      </option>
                      <option value="BIVZAP|usu">
                        BIVIANA ANDREA ZAPATA GARZON
                      </option>
                      <option value="CARGAR|usu">
                        CARLOS JOSE GARCIA BERNAL
                      </option>
                      <option value="CARCIF|usu">CARMEN ELENA CIFUENTES</option>
                      <option value="CARROD|usu">
                        CARMEN LILIANA RODRIGUEZ RODRIGUEZ
                      </option>
                      <option value="CARROM|usu">
                        CAROLINA ROMERO CAICEDO
                      </option>
                      <option value="CESGON|usu">
                        CESAR RAUL GONZALEZ JUAJIBIOY
                      </option>
                      <option value="DANCAS|usu">
                        DANIEL FERNANDO CASTRO PARRA
                      </option>
                      <option value="DIAGAR|usu">DIANA GARCIA</option>
                      <option value="DIAORT|usu">
                        DIANA PATRICIA ORTEGA FISCO
                      </option>
                      <option value="DIAQUE|usu">
                        DIANA PATRICIA QUEVEDO ROJAS
                      </option>
                      <option value="DIMDEARM|usu">
                        DIMAS ENRIQUE DE ARMAS PACHECO
                      </option>
                      <option value="DORCAM|usu">DORA EUGENIA CAMARGO</option>
                      <option value="DUNMAR|usu">
                        DUNIA MARTINEZ DE SABOGAL
                      </option>
                      <option value="EDGCUE|usu">
                        EDGAR ANDRES CUERVO ORTEGA
                      </option>
                      <option value="EDGCAR|usu">
                        EDGAR MAURICIO CARDENAS ORTIZ
                      </option>
                      <option value="EDUCAL|usu">
                        EDUIN ANTONIO CALDERA PRADO
                      </option>
                      <option value="FABSAN|usu">
                        FABIAN SANCHEZ MARTINEZ
                      </option>
                      <option value="ANGPEN|usu">FLOR ANGELA PENA GALAN</option>
                      <option value="FRAORT|usu">
                        FRANCY ELENA ORTIZ MEDINA
                      </option>
                      <option value="GERROM|usu">GERMAN ROMERO</option>
                      <option value="GILLOR|usu">GILBERTO LORDUY MORENO</option>
                      <option value="GLOOVA|usu">
                        GLORIA ALEJANDRA OVALLE
                      </option>
                      <option value="GUSGAI|usu">
                        GUSTAVO ADOLFO GAITAN HERRERA
                      </option>
                      <option value="HECPEN|usu">
                        HECTOR AUGUSTO PENA TOVAR
                      </option>
                      <option value="HILCAN|usu">
                        HILDA LEONOR CANAS QUICENO
                      </option>
                      <option value="IVANDLR|usu">
                        IVAN DE LA ROCHE MERINO
                      </option>
                      <option value="IVEMAR|usu">
                        IVETH MARIA MARTINEZ TAPIAS
                      </option>
                      <option value="JAILAC|usu">
                        JAIRO ENRIQUE LACHE JIMENEZ
                      </option>
                      <option value="JANVAL|usu">JANETH VALENCIA OTERO</option>
                      <option value="JAVBEL|usu">JAVIER BELTRAN HURTADO</option>
                      <option value="JAVISA|usu">JAVIER ISAZA RAMOS</option>
                      <option value="YESMOR|usu">JESIKA MORENO FARA</option>
                      <option value="JOHROM|usu">
                        JOHN ALVARO ROMERO CAMARGO
                      </option>
                      <option value="JOHBAR|usu">
                        JOHN FREDY BARRERA RINCON
                      </option>
                      <option value="JOSGAR|usu">
                        JOSE FLAMINIO GARCIA SALDANA
                      </option>
                      <option value="JUAJIM|usu">JUAN CARLOS JIMENEZ</option>
                      <option value="JUACHI|usu">
                        JUAN MANUEL CHISCO PINILLA
                      </option>
                      <option value="JULSOL|usu">
                        JULIO ANDRES SOLANO SANCHEZ
                      </option>
                      <option value="LADCAS|usu">
                        LADY YANET CASTANO RESTREPO
                      </option>
                      <option value="LAUOSS|usu">LAURA MANUELA OSSA</option>
                      <option value="LEIROA|usu">LEIDY YOHANNA ROA</option>
                      <option value="LILCAR|usu">LILIANA CARDENAS</option>
                      <option value="LINSAN|usu">LINA MARIA SANCHEZ</option>
                      <option value="LUIPEN|usu">
                        LUIS ALBERTO PENA MARIN
                      </option>
                      <option value="LUIRIC|usu">
                        LUISA FERNANDA RICO REYES
                      </option>
                      <option value="LUZMAR|usu">LUZ DARY MARTINEZ</option>
                      <option value="LUZRAM|usu">
                        LUZ INGRID RAMIREZ GONZALEZ
                      </option>
                      <option value="MARMED|usu">MARCELA MEDINA ORTEGA</option>
                      <option value="MARLOA|usu">
                        MARCO ALFREDO LOAIZA MILLAN
                      </option>
                      <option value="MARRUB|usu">
                        MARIA ALEJANDRA RUBIO JIMENEZ
                      </option>
                      <option value="MARFON|usu">
                        MARIA CRISTINA FONTECHA
                      </option>
                      <option value="MARCIF|usu">
                        MARIA FERNANDA CIFUENTES PUERTO
                      </option>
                      <option value="MARGAL|usu">MARIBEL GALEANO ARDILA</option>
                      <option value="MARCOR|usu">MARICELA CORREDOR</option>
                      <option value="MARMER|usu">
                        MARIO ENRIQUE MERINO PACHECO
                      </option>
                      <option value="MARURR|usu">
                        MARTHA CECILIA URREGO JIMENEZ
                      </option>
                      <option value="MAURAM|usu">MAURICIO ANTONIO RAMOS</option>
                      <option value="MAUVAN|usu">
                        MAURICIO VANEGAS MERINO
                      </option>
                      <option value="NANSUA|usu">NANCY SUA</option>
                      <option value="NATTOB|usu">NATALIA TOBON PENA</option>
                      <option value="NUBSUA|usu">NUBIA SUAREZ DIAZ</option>
                      <option value="OLGCAS|usu">OLGA LUCÍA CASILIMAS</option>
                      <option value="ORBHEN|usu">ORBEISON HENAO OQUENDO</option>
                      <option value="ORLRAM|usu">ORLIRIAN RAMOS RAMIREZ</option>
                      <option value="OSCVAL|usu">
                        OSCAR ANDRES VALDERRAMA
                      </option>
                      <option value="PAOOVA|usu">PAOLA OVALLE GARCIA</option>
                      <option value="PAUTRI|usu">PAULA TRIANA SAENZ</option>
                      <option value="RAMPER|usu">RAMIRO PERDOMO</option>
                      <option value="RAMLAS|usu">
                        RAMON ENRIQUE LASPRIELLA
                      </option>
                      <option value="LEOPOR|usu">RAUL LEONARDO PORRAS</option>
                      <option value="REVFIS|usu">REVISORIA FISCAL</option>
                      <option value="RICLAT|usu">
                        RICARDO ANDRES LATINO AORTIZ
                      </option>
                      <option value="ROBREY|usu">ROBERTO REYES CUEVAS</option>
                      <option value="ROCSEG|usu">
                        ROCIO DEL PILAR SEGURA BERNAL
                      </option>
                      <option value="RUBSIM|usu">
                        RUBEN DARIO SIMBAQUEVA ROJAS
                      </option>
                      <option value="RUTMOR|usu">
                        RUTH JENNY MORENO VILLARRAGA
                      </option>
                      <option value="SANDIA|usu">
                        SANDRA MILENA DIAZ ARDILA
                      </option>
                      <option value="SST|usu">
                        SEGURIDAD Y SALUD EN EL TRABAJO
                      </option>
                      <option value="SERMES|usu">SERGIO ALEJANDRO MESA</option>
                      <option value="TANZUN|usu">
                        TANIA GINETH ZUÑIGA CAMARGO
                      </option>
                      <option value="TERTOR|usu">
                        TERESA TORRES SARMIENTO
                      </option>
                      <option value="TESORERIA|usu">TESORERIA</option>
                      <option value="VICGUT|usu">
                        VICTOR MANUEL GUTIERREZ DIAZ
                      </option>
                      <option value="WILGRA|usu">
                        WILLIAM MAURICIO GRANADOS MELO
                      </option>
                      <option value="WILBAL|usu">
                        WILSON ALEJANDRO BALLESTEROS
                      </option>
                      <option value="YENMAR|usu">
                        YENNY MARCELA MARIN NARANJO
                      </option>
                      <option value="YENCOR|usu">
                        YENNY PAOLA CORTES PINZON
                      </option>
                      <option value="YESRUI|usu">YESENIA RUIZ MEDINA</option>
                      <option value="YULGOM|usu">
                        YULIET PAOLA GOMEZ PESCADOR
                      </option>
                      <option value="YURURR|usu">YURANI URREGO AMARILES</option>
                      <option value="ZULFIE|usu">ZULUAY FIERRO HERRERA</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success btn-sm">
              {" "}
              <i className="fa fa-filter" /> Consultar{" "}
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: !this.state.modal });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// Aca se valida que el props que se va a pasar sea un bool y no cualquier valor
ModalSearchAuditoria.propTypes = {
  modalSearch: PropTypes.bool.isRequired
};

export default ModalSearchAuditoria;
