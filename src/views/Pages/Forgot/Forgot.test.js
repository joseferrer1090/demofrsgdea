import React from "react";
import Forgot from "./Forgot";
import { render, shallow } from "enzyme";
import { expect } from "chai";

describe("Forgot", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Forgot />);
    expect(component.find(<Forgot />));
  });
});

// Tengo dudas por la forma, debo hacer un click para el boton que se encuentra en la interfaz de forgot
