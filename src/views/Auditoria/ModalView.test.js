import React from "react";
import { mount, shallow } from "enzyme";
import { Modal } from "reactstrap";
import ModalViewAuditoria from "./components/ModalViewAuditoria";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<ModalViewAuditoria modalview={false} />);
});

it("hace modal cuando el indicador abierto es verdadero", () => {
  wrapped.setProps({ modalview: true });
  expect(wrapped.find(Modal).length).toBe(1);
});

it("hace modal cuando el indicador abierto es verdadero", () => {
  wrapped.setProps({ modalSearch: false });
  expect(wrapped.find(Modal).length);
});
