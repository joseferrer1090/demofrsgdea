import React from 'react';
import Select from 'react-select';
class Assignedpermissions extends React.Component {
  state = {
    dataPermission: [],
    id: this.props.entidad,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.entidad !== state.id) {
      return {
        id: props.entidad
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.entidad !== prevProps.entidad) {
      this.getPermissionById();
    }
  }

  componentDidMount() {
    this.getPermissionById();
  }

  getPermissionById = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/permission/page/entity/${this.state.id}`,
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
          dataPermission: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  handleChange = value => {
    this.props.onChange('permisos', value);
  };

  handleBlur = () => {
    this.props.onBlur('permisos', true);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <Select
          name={this.props.name}
          options={this.state.dataPermission.map((aux, id) => {
            return { label: aux.name, value: aux.id };
          })}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={t('app_roles_form_registrar_asiganar_permisos_select')}
        />
      </div>
    );
  }
}
export default Assignedpermissions;
