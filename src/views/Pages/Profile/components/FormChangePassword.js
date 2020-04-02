import React from "react";
import Changepassword from "./Forms/ChangepasswordForm";
import { withTranslation } from "react-i18next";

const FormChangePassword = props => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <div className="col-md-8 offset-2">
          <Changepassword authorization={props.authorization} t={props.t} />
        </div>
      </div>
    </div>
  );
};

export default withTranslation("translations")(FormChangePassword);
