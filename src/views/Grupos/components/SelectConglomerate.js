import React from 'react'
import { CONGLOMERATES_STATUS } from "../../../services/EndPoints";

class SelectConglomerado extends React.Component {
    state = {
      dataConglomerate: [],
      auth: this.props.token,
      t: this.props.t
    };
  
    componentDidMount() {
      this.getData();
    }
  
    getData = () => {
      fetch(`${CONGLOMERATES_STATUS}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.token
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            dataConglomerate: data
          });
        });
    };
  
    handleChange = value => {
      this.props.onChange("usuario_conglomerate", value);
    };
  
    handleBlur = () => {
      this.props.onBlur("usuario_conglomerate", true);
    };
  
    render() {
      // const selectOptionsConglomerate = this.state.dataConglomerate.map(
      //   (aux, id) => {
      //     return <option value={aux.id}>{aux.name}</option>;
      //   }
      // );
      const { t } = this.state;
      return (
        <div>
          <select
            name={this.props.name}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            value={this.props.value}
            className={this.props.className}
          >
            <option value={""}>
              -- {t("app_grupoUsuarios_modal_editar_select_conglomerado")} --
            </option>
            {this.state.dataConglomerate.map((aux, id) => {
              return (
                <option key={id} value={aux.id}>
                  {aux.name}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
  }
  export default SelectConglomerado;