import React from "react";
import Pass from "./pasarGrupos";


export default ({ dataGrupouser, adduser }) => {
  const listuser = dataGrupouser.map((user, e) => {
    return (
      <Pass
        id={user.id}
        key={e}
        info={user}
        handleaddrol={id => adduser(id)}
      />
    );
  });
  return (
  <div>
      <select
        multiple
        style={{
          width: "370px",
          marginLeft: "14px"
        }}
        className="form-control"
      >
        {listuser}
      </select>
    </div>
  );
};
 /* <Row>
                              <div className="col-md-6">
                              <label className="col-md-12"><dt>Usuarios disponibles:</dt></label>
                                  <listarGrupos
                                    data={this.state.dataGrupouser}
                                    users={this.state.data}
                                    addUser={this.adduser.bind(this)}
                                  />
                                  </div>
                                  </Row>
                                  */
