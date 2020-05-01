import React from "react";
import Inputs from "./Inputs";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

export const PreviewTemplate = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardHeader>
              <i className="fa fa-wpforms" /> Plantilla de datos
            </CardHeader>
            <CardBody>
              <p>Probando apenas</p>
              <Inputs />
            </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PreviewTemplate;
