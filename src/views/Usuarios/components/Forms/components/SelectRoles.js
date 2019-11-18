import React from 'react';
import Select from 'react-select';

class MySelect extends React.Component {
  state = {
    dataRoles: [],
    t: this.props.t
  };

  componentDidMount() {
    this.getData();
  }

  handleChange = value => {
    this.props.onChange('rolesID', value);
  };

  handleBlur = () => {
    this.props.onBlur('rolesID', true);
  };

  getData = async () => {
    let url = 'http://192.168.10.180:7000/api/sgdea/role/active';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    });
    const data = await response.json();
    this.setState({
      dataRoles: data
    });
  };

  render() {
    const aux = this.state.dataRoles.map((aux, id) => {
      return {
        label: aux.name,
        value: aux.id
      };
    });
    const { t } = this.props;

    return (
      <div style={{ margin: '0' }}>
        <Select
          name={this.props.name}
          options={aux}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={
            '-- ' + t('app_usuarios_form_registrar_roles_select') + ' --'
          }
        />
      </div>
    );
  }
}
export default MySelect;
