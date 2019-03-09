import React, { Component } from "react";

import PropTypes from "prop-types";

class AssignedTheme extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <table className="table table-hover table-striped">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Tema</th>
              <th scope="col">Grupo</th>
              <th scope="col">Usuarios</th>
              <th scopen="col"> Activar </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <th scope="row">1</th>
              <td>Mark</td>
              <td>
                <select className="form-control form-control-sm">
                  {" "}
                  <option> Seleccione... </option>{" "}
                </select>
              </td>
              <td>
                <select className="form-control form-control-sm">
                  {" "}
                  <option>Seleccione</option>{" "}
                </select>
              </td>
              <td>
                {" "}
                <button className="btn btn-secondary btn-sm">
                  {" "}
                  <i className="fa fa-power-off" /> Activar{" "}
                </button>{" "}
              </td>
            </tr>

            <tr className="text-center">
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>
                {" "}
                <select className="form-control form-control-sm">
                  {" "}
                  <option> Seleccione... </option>{" "}
                </select>
              </td>
              <td className="text-center">
                {" "}
                <select className="form-control form-control-sm">
                  {" "}
                  <option>Seleccione</option>{" "}
                </select>
              </td>
              <td>
                {" "}
                <button className="btn btn-secondary btn-sm">
                  {" "}
                  <i className="fa fa-power-off" /> Activar{" "}
                </button>{" "}
              </td>
            </tr>

            <tr className="text-center">
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>
                <select className="form-control form-control-sm">
                  {" "}
                  <option> Seleccione... </option>{" "}
                </select>
              </td>
              <td>
                {" "}
                <select className="form-control form-control-sm">
                  {" "}
                  <option>Seleccione</option>{" "}
                </select>
              </td>
              <td>
                {" "}
                <button className="btn btn-secondary btn-sm">
                  {" "}
                  <i className="fa fa-power-off" /> Activar{" "}
                </button>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

AssignedTheme.propTypes = {};

export default AssignedTheme;
