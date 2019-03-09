import React from "react";
import { shallow, mount } from "enzyme/build";
import { expect } from "chai";
import FormCreateConglomerado from "./components/FormCreateConglomerado";
import TableConglomerado from "./components/TableContentConglomerado";
import ModalViewConglomerado from "./components/ModalViewConglomerado";
import ModalEditConglomerado from "./components/ModalEditConglomerado";
import ModalDeleteConglomerado from "./components/ModalDeleteConglomerado";
import ImportConglomerado from "./components/FormUploadFile";
import { isIterable } from "core-js";
import Conglomerado from "./Conglomerado";

it("mounts without crashing Conglomerado principal", () => {
  const wrapper = shallow(<Conglomerado />);
  wrapper.unmount();
});

it("mounts without crashing tabla Conglomerado", () => {
  const wrapper = mount(<TableConglomerado />);
  expect(wrapper.find(<ModalViewConglomerado modalviewstate={true} />));
  expect(wrapper.find(<ModalEditConglomerado modaleditstate={true} />));
  expect(wrapper.find(<ModalDeleteConglomerado modaldeletestate={true} />));
  wrapper.mount();
});

it("mounts without crashing formulario importat", () => {
  const wrapper = mount(<ImportConglomerado />);
  wrapper.mount();
});
