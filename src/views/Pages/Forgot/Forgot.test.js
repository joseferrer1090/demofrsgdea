import React from "react";
import { shallow } from "enzyme";
import Forgot from "./Forgot";
import { Form } from "reactstrap";

describe(`Test for componet Forgot`, () => {
  it(`Form forgot exists`, () => {
    expect(
      shallow(<Forgot />)
        .find(Form)
        .exists()
    ).toBe(true);
  });
  it(`Test for input type username if exists`, () => {
    const component = shallow(<Forgot />);
    expect(component.find("#username").length).toBe(1);
  });

  it(`Test for event onChange input username`, () => {
    const component = shallow(<Forgot />);
    component
      .find("#username")
      .simulate("change", { target: { name: "username", value: "usuario" } });

    expect(component.state("username")).toEqual("usuario");
  });
});
