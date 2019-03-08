import React from "react";
import Forgot from "./Forgot"; // Forgot
import { shallow } from "enzyme"; // Render component without child
import { expect } from "chai";

describe("Forgot", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Forgot />);
    expect(component.find(<Forgot />));
  });
});

// Falta agregar el test para envento y la interfaz externa
