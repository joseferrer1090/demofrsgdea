import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { Formik } from "formik";

const CreatePlantillaForm = props => {
  return (
    <div className="row">
      <div className="col-md-8 offset-2">
        <Card>
          <CardHeader>Plantilla</CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default CreatePlantillaForm;
