import React from "react";
import PropTypes from "prop-types";
import PlantillaEmailForm from "./Forms/PlantillaEmailForm";
const dataPlantillaEmail = {
  html: "",
  css: ""
};
const FormCreateTemplateEmail = props => {
  return (
    <div className="animated fadeIn">
      <PlantillaEmailForm
        templateEmail={dataPlantillaEmail}
        authorization={props.authorization}
      />
    </div>
  );
};
FormCreateTemplateEmail.propTypes = {
  templateEmail: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};
export default FormCreateTemplateEmail;
