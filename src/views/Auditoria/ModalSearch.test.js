import React from "react";
import { mount, shallow } from "enzyme";
import Auditoria from "./Auditoria";
import ModalSearchAuditoria from "./components/ModalSearchAuditoria";

// it("should render settings component correctly", () => {
//   const wrapper = shallow(<Auditoria />);
//   expect(wrapper).toMatchSnapshot();
// });

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
  const props = { modalSearch: false };
  wrapped.unmount(
    <div>
      <ModalSearchAuditoria {...props} />
    </div>
  );
});
