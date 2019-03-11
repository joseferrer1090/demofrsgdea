import React from "react";
import { shallow } from "enzyme";
// components for testing
import Auditoria from "./Auditoria";
import ModalSearch from "./components/ModalSearchAuditoria";
import ModalView from "./components/ModalViewAuditoria";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Auditoria />);
});

it("should render Settings component correctly", () => {
  const wrapper = shallow(<Auditoria />);
  expect(wrapper).toMatchSnapshot();
});

it("show modal search", () => {
  expect(wrapped.find(ModalSearch).length).toEqual(1);
});

it("show modal view", () => {
  expect(wrapped.find(ModalView).length).toEqual(1);
});
