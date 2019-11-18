import React from 'react';
class MySelectEntidades extends React.Component {
  state = {
    dataEntidades: [],
    id: this.props.modulo,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.modulo !== state.id) {
      return {
        id: props.modulo
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.modulo !== prevProps.modulo) {
      this.getDataEntity();
    }
  }

  componentDidMount() {
    this.getDataEntity();
  }

  getDataEntity = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/entity/module/${this.state.id}/active`,
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
          dataEntidades: data
        });
        console.log(data);
      })
      .catch(err => console.log('Error', err));
  };

  handleChange = value => {
    this.props.onChange('entidades', value);
  };

  handleBlur = () => {
    this.props.onBlur('entidades', true);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
          value={this.props.value}
        >
          <option value={''}>
            -- {t('app_roles_form_registrar_entidades_select')} --
          </option>
          {this.state.dataEntidades.map((aux, id) => {
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
export default MySelectEntidades;
