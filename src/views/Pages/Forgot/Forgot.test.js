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
});
