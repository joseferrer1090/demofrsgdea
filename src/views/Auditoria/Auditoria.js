import React from "react";
import { Row, Col } from "reactstrap";

const Auditoria = () => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col sm="6" md={{ offset: 3 }}>
          <div className="card" style={{ border: "1px solid black" }}>
            <div className="card-header">Consulta Auditoria</div>
            <div className="card-body">
              <p> Probando </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Auditoria;
