import React from 'react';
class SelectDepartment extends React.Component {
  state = {
    dataDepartment: [],
    id: this.props.tercero_pais,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.tercero_pais !== state.id) {
      return {
        id: props.tercero_pais
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tercero_pais !== prevProps.tercero_pais) {
      this.getDataDepartment();
    }
  }

  componentDidMount() {
    this.getDataDepartment();
  }

  getDataDepartment = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/department/country/${this.state.id}`,
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
          dataDepartment: data
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
          className={this.props.className}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          <option value={''}>
            -- {t('app_tercero_modal_actualizar_select_departamento')} --
          </option>
          {this.state.dataDepartment.map((aux, id) => {
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
export default SelectDepartment;
