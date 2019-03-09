import React from "react";
import { shallow, mount } from "enzyme/build";
import { expect } from "chai";
import Mensajero from "./Mensajero";
import FormCreate from "./components/FormCreateMensajero";
import TableContent from "./components/TableContentMensajero";
import ModalViewMensajero from "./components/ModalViewMensajero";
import ModalUpdateMensajero from "./components/ModalActualizarMensajero";
import ModalDeleteMensajero from "./components/ModalDeleteMensajero";
import FormImportMensajero from "./components/FormImportMensajero";

it("mounts without crashing Mensajero", () => {
  const wrapper = mount(<Mensajero />);
  wrapper.mount();
});

it("mounts without crashing Registro", () => {
  const wrapper = mount(<FormCreate />);
  wrapper.mount();
});

it("mounts without crashing Tabla operaciones", () => {
  const wrapper = mount(<TableContent />);
  expect(wrapper.find(<ModalViewMensajero modalview={true} />));
  expect(wrapper.find(<ModalUpdateMensajero modalupdate={true} />));
  expect(wrapper.find(<ModalDeleteMensajero modaldelete={true} />));
  wrapper.mount();
});

it("mounts without crashing Fomulario importar", () => {
  const wrapper = mount(<FormImportMensajero />);
  wrapper.unmount();
});
