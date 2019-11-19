import React from 'react';
class SelectSede extends React.Component {
  state = {
    dataSede: [],
    id: this.props.idEmpresa,
    t: this.props.t
  };

  static getDerivedStateFormProps(props, state) {
    if (props.idEmpresa !== state.id) {
      return {
        id: props.idEmpresa
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idEmpresa !== prevProps.idEmpresa) {
      // Metodo
      this.getDataSede();
    }
  }

  componentDidMount() {
    this.getDataSede();
  }

  getDataSede = () => {
    fetch(
      `http://192.168.20.187:7000/api/sgdea/headquarter/company/${this.props.idEmpresa}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataSede: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
        >
          <option>
            -- {t('app_tipoTramite_form_registrar_select_sede')} --
          </option>
          {this.state.dataSede.map((aux, id) => {
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
export default SelectSede;
