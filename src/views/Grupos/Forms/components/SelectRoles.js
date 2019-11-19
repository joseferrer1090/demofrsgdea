import React from 'react';
import Select from 'react-select';

class MySelect extends React.Component {
  state = {
    dataUsersDependencia: [],
    id: this.props.idDependence,
    username: 'jferrer'
  };

  static getDerivedStateFromProps(props, state) {
    if (props.idDependence !== state.id) {
      return {
        id: props.idDependence
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idDependence !== prevProps.idDependence) {
      this.getDataUserDependenceList();
    }
  }

  getDataUserDependenceList = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/user/dependence/${this.props.idDependence}`,
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
          dataUsersDependencia: data
        });
        //console.log(data);
      })
      .catch(err => console.log('Error', err));
  };

  componentDidMount() {
    this.getDataUserDependenceList();
  }

  // Lista de usuarios por la dependencia //

  handleChange = value => {
    this.props.onChange('roles', value);
  };

  handleBlur = () => {
    this.props.onBlur('roles', true);
  };

  render() {
    const { t } = this.props;

    return (
      <div style={{ margin: '0' }}>
        <Select
          name={this.props.name}
          options={this.state.dataUsersDependencia.map((aux, id) => {
            return { label: aux.name, value: aux.id };
          })}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={t(
            'app_grupoUsuarios_form_registrar_placeholder_usuarios_asigandos'
          )}
        />
        {/* {!!this.props.error && this.props.touched && (
            <div
              style={{ color: "red", marginTop: ".5rem" }}
              className="invalid-feedback"
            >
              {this.props.error}
            </div>
          )} */}
      </div>
    );
  }
}
export default MySelect;
