import React from "react";
import { mount, shallow } from "enzyme";
import Auditoria from "./Auditoria";
import ModalViewAuditoria from "./components/ModalViewAuditoria";

it("should render settings component correctly", () => {
  const wrapper = shallow(<Auditoria />);
  expect(wrapper).toMatchSnapshot();
});
