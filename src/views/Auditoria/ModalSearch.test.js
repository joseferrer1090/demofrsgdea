import React from "react";
import { mount, shallow } from "enzyme";
import { Modal } from "reactstrap";
import ModalSearchAuditoria from "./components/ModalSearchAuditoria";

// it("should render settings component correctly", () => {
//   const wrapper = shallow(<Auditoria />);
//   expect(wrapper).toMatchSnapshot();
// });

let wrapped;

beforeEach(() => {
  wrapped = shallow(<ModalSearchAuditoria modalSearch={false} />);
});

it("hace modal cuando el indicador abierto es verdadero", () => {
  // Lo que debe hacer es enviar a wrapped el prop en false
  // y verificar que el modal este cerrado, no se q clase agrega cuando el modal no esta
  // lo segundo es pasarle el prop true y verificar q este abierto
  wrapped.setProps({ modalSearch: true }); // creo q es asi
  expect(wrapped.find(Modal).length).toBe(1);
});

it("probando el test para un select acciones", () => {
  expect(wrapped.find("#acciones").length).toBe(1);
  expect(
    wrapped
      .find("#acciones")
      .simulate("change", { target: { value: "actualizar" } })
  );
});

it("probando el test para el select usuarios", () => {
  expect(wrapped.find("#usuarios").length).toEqual(1);
});

it("hace modal cuando el indicador abierto es verdadero", () => {
  // Lo que debe hacer es enviar a wrapped el prop en false
  // y verificar que el modal este cerrado, no se q clase agrega cuando el modal no esta
  // lo segundo es pasarle el prop true y verificar q este abierto
  wrapped.setProps({ modalSearch: false }); // creo q es asi
  expect(wrapped.find(Modal).length);
});

// test('test should set new date on date change', () => {
//   const now = moment();
//   const wrapper = shallow(<ExpenseForm />);
//   wrapper.find('SingleDatePicker').prop('onDateChange')(now);
//   expect(wrapper.state('createdAt')).toEqual(now);
// });
