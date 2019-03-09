import React from "react";
import Auditoria from "./Auditoria";
import ModalSearchAuditoria from "./components/ModalSearchAuditoria";
import ModalViewAuditoria from "./components/ModalViewAuditoria";
import { shallow } from "enzyme"; // Render component without child
import { mount } from "enzyme";
import { expect } from "chai";

describe("Auditoria", () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount(<Auditoria />);
    expect(component.find(<ModalSearchAuditoria modalSearch={false} />));
    expect(component.find(<ModalViewAuditoria modalview={true} />));
  });
  it('should render correnttly in "debug" mode', () => {
    const component = shallow(<Auditoria />);
    expect(component.find(<ModalSearchAuditoria modalSearch={true} />));
    expect(component.find(<ModalViewAuditoria modalview={true} />));
  });
});
