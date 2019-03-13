import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";
import Login from "./Login";
import { Form } from "reactstrap";

describe(`Test for component Login`, () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it(`test Form login exists`, () => {
    expect(
      shallow(<Login />)
        .find(Form)
        .exists()
    ).toBe(true);
  });

  it(`test for input user`, () => {
    expect(shallow(<Login />).find("#username").length).toEqual(1);
  });

  it(`test for input password`, () => {
    expect(shallow(<Login />).find("#password").length).toEqual(1);
  });

  it(`test for change event input user`, () => {
    const component = shallow(<Login />);
    component
      .find("#username")
      .simulate("change", { target: { name: "username", value: "usuario" } });

    expect(component.state("username")).toEqual("usuario");
  });

  it(`test for change envent input password`, () => {
    const component = shallow(<Login />);
    component
      .find("#password")
      .simulate("change", { target: { name: "password", value: "password" } });

    expect(component.state("password")).toEqual("password");
  });
});
