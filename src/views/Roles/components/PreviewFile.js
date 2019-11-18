import React from 'react';
import PropTypes from 'prop-types';
import { CsvToHtmlTable } from 'react-csv-to-table';
class PreviewFile extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }
    this.setState(
      {
        loading: true
      },
      () => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };

        reader.readAsBinaryString(nextProps.file);
      }
    );
  }
  render() {
    const { file } = this.props;
    const { loading } = this.state;
    const thumb = this.state.thumb;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    PreviewFile.propTypes = {
      file: PropTypes.any
    };

    return <CsvToHtmlTable data={thumb} tableClassName={this.props.estilos} />;
  }
}
export default PreviewFile;
