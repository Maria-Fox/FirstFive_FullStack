import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils"

// smoke
test("Should render Home Page", function () {
  render(
    <MemoryRouter>
      <UserContext.Provider value={userWithMatchState}>
        <Home />
      </UserContext.Provider>
    </MemoryRouter>);
});



// snapshot test. The first time user will have "Loading..."
test("Creates a Home snapshot", function () {

  // as fragment is a method destructured from the return obj. Puts return item in a div and we can test what's in the fragment.
  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={userWithMatchState}>
        <Home />
      </UserContext.Provider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});