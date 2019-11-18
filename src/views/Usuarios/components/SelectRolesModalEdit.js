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

  handleChange = value => {
    this.props.onChange('roles', value);
  };

  handleBlur = () => {
    this.props.onBlur('roles', true);
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
          onBlur={this.props.onBlur}
          value={this.props.value}
          placeholder={`-- ${t('app_usuarios_modal_editar_roles_select')} --`}
        />
      </div>
    );
  }
}
export default MySelect;
