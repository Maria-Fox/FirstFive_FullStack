import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "../TestUtils";
import About from "./About";

test("Smoke - About renders", function () {
  render(<About />);
});

test("About renders for valid user", function () {

  let { asFragment } = render(
    <UserProvider>
      <About />
    </UserProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("About does NOT render for invalid user", function () {

  let { asFragment } = render(
    <About />
  );

  expect(asFragment()).not.toMatchSnapshot();
});