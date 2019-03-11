import React from "react";
import { mount } from "enzyme";
import Auditoria from "./Auditoria";
import ModalSearchAuditoria from "./components/ModalSearchAuditoria";

let wrapped;

beforeEach(() => {
  const props = { modalSearch: true };
  wrapped = mount(
    <Auditoria>
      <ModalSearchAuditoria {...props} />
    </Auditoria>
  );
});

it("renders modal when open flag is true", () => {
  const wrapped = mount(
    <div>
      <ModalSearchAuditoria />
    </div>
  );
  wrapped.update();

  expect(wrapped.find(".modal-lg").exists()).toEqual(true);
});

afterEach(() => {
  wrapped.unmount();
});
