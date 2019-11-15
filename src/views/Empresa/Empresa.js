import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import FormCreate from './components/FormCreateEmpresa';
import TableContent from './components/TableContentEmpresa';
import FormImport from './components/FormUpload';
import { withTranslation } from 'react-i18next';

class Empresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              <i className="fa fa-plus" /> {t('app_empresa_tab')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              <i className="fa fa-gear" /> {t('app_empresa_tab_2')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              <i className="fa fa-upload" /> {t('app_empresa_tab_3')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="8" md={{ offset: 2 }}>
                <FormCreate />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col md="12">
                <TableContent />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col md="12">
                <FormImport />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

Empresa.propTypes = {};

export default withTranslation('translations')(Empresa);
