import React from 'react';
class SelectConglomerado extends React.Component {
  state = {
    dataConglomerado: [],
    t: this.props.t
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerado: data
        });
      });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          // onChange={e => setFieldValue("conglomerado", e)}
          value={this.props.value}
          // onBlur={this.handleBlur}
          className={this.props.className}
        >
          <option value={''}>
            -- {t('app_grupoUsuarios_form_registrar_select_conglomerado')} --
          </option>
          {this.state.dataConglomerado.map((aux, id) => {
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
