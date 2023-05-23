import React from "react";
import { render } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import { MemoryRouter } from "react-router-dom";

test("Renders RegistrationForm componenet", function () {
  render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>);
});

test("Rendered RegisterForm correctly", function () {

  // as fragment is a method destructured from the return obj. Puts return item in a div and we can test what's in the fragment.
  let { asFragment } = render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});