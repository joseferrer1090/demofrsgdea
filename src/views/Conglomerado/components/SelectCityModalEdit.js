import React from 'react';
import PropTypes from 'prop-types';

class SelectCity extends React.Component {
  state = {
    dataCity: [],
    id: this.props.conglomerate_department,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conglomerate_department !== state.id) {
      return {
        id: props.conglomerate_department
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.conglomerate_department !== prevProps.conglomerate_department
    ) {
      this.getDataCitys();
    }
  }

  componentDidMount() {
    this.getDataCitys();
  }

  getDataCitys = () => {
    fetch(
      `http://192.168.20.187:7000/api/sgdea/city/department/${this.state.id}`,
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
          dataCity: data
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
            -- {t('app_conglomerado_modal_actualizar_ciudad_select')} --
          </option>
          {this.state.dataCity.map((aux, id) => {
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

SelectCity.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};

export default SelectCity;
