import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";


class FormCreateConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Card className="">
          <CardHeader>Registro de Conglomerado</CardHeader>
          <CardBody>
            <form className="form">
              <div className="row">
               <div className="col-md-12">
               <div className="col-md-4 float-right">
                <label> Fecha de registro  <span className="text-danger">*</span> </label>
                <input className="form-control" type="text" disabled/>
               </div>
               </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Dato1 <span className="text-danger">*</span>{" "}
                    </label>
                    <input type="text" className="form-control" placeholder="Dato 1"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <label> Dato2 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="dato2"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label> Dato3 <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="dato3"/>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label> Dato4  </label>
                    <textarea className="form-control" rows={"8"} placeholder="Dato 4"></textarea>
                  </div>
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter>
            <Button className="btn btn-secundary pull-right">
              <i className="fa fa-plus" /> Registrar{" "}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default FormCreateConglomerado;
