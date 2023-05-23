import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";

// smoke
test("Should render LoginForm", function () {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>);
});



// snapshot test. The first time you run this will take a snapshot, then re-run to compare the outcomes.
test("Creates a LoginForm snapshot", function () {

  // as fragment is a method destructured from the return obj. Puts return item in a div and we can test what's in the fragment.
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});