import React from "react";
import { Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import Changepassword from "./Forms/ChangepasswordForm";

const dataPassword = {
  new_password: "",
  confirm_password: "",
  old_password: ""
};

const FormChangePassword = () => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <div className="col-md-8 offset-2">
          <Changepassword changepassword={dataPassword} />
        </div>
      </div>
    </div>
  );
};

export default FormChangePassword;
