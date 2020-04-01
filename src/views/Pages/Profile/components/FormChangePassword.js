import React, { useEffect } from "react";
import { Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import Changepassword from "./Forms/ChangepasswordForm";

const dataPassword = {
  new_password: "",
  confirm_password: "",
  old_password: ""
};

const FormChangePassword = props => {
  // useEffect(() => {
  //   console.log(props.authorization);
  // }, [props.authorization]);
  return (
    <div className="animated fadeIn">
      <div className="row">
        <div className="col-md-8 offset-2">
          <Changepassword
            // changepassword={dataPassword}
            authorization={props.authorization}
          />
        </div>
      </div>
    </div>
  );
};

export default FormChangePassword;
