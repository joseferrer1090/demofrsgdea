import React from 'react';

class MySelectModulos extends React.Component {
  state = {
    dataModule: [],
    t: this.props.t
  };

  componentDidMount() {
    this.getDataModule();
  }

  getDataModule = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/module/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataModule: data
        });
      })
      .catch(err => console.log('', err));
  };

  handleChange = value => {
    this.props.onChange('modulos', value);
  };

  handleBlur = () => {
    this.props.onBlur('modulos', true);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          className="form-control form-control-sm"
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          name={this.props.name}
          value={this.props.value}
        >
          <option value={0}>
            {' '}
            -- {t('app_roles_form_registrar_modulo_select')} --{' '}
          </option>
          {this.state.dataModule.map((aux, id) => {
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
export default MySelectModulos;
