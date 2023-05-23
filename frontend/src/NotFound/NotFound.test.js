import React from "react";
import { render } from "@testing-library/react";
import NotFound from "./NotFound";
import { MemoryRouter } from "react-router";

// smoke
test("Should render NotFound Page", function () {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>);
});



// snapshot test. The first time user will have "Loading..."
test("Creates a NotFound snapshot", function () {

  // as fragment is a method destructured from the return obj. Puts return item in a div and we can test what's in the fragment.
  const { asFragment } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});