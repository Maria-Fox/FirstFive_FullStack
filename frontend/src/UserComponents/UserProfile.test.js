import React from "react";
import { render, waitFor } from "@testing-library/react";
import UserProfile from "./UserProfile";
import UserContext from "./UserContext";
import { MemoryRouter } from "react-router-dom";
import { authUser } from "../TestUtils";
// Mock API
import API from "../API";
jest.mock("../API")

test("Smoke- Renders UserProfile component w/ valid user", function () {

  render(
    <MemoryRouter>
      <UserContext.Provider value={authUser}>
        <UserProfile />
      </UserContext.Provider>
    </MemoryRouter>
  );
});


test("Snapshot- Renders loading before API call.", function () {

  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={authUser}>
        <UserProfile />
      </UserContext.Provider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("Component has userData after API call", function () {

  jest.mock("axios");
  // Mock API call anad response data.

  API.mockImplementationOnce(() => {
    return {
      request: () => {
        return [
          {
            username: 1,
            email: "softwaredev1@gmail.com",
            bio: "Software Developer with almost a year of experience. Looking to work with a group using Node.js or React!",
          }
        ];
      },
    };
  });

  const utils = render(
    <UserContext.Provider value={authUser}>
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    </UserContext.Provider>
  );

  waitFor(() => {
    expect(utils.getByText("softwaredev1@gmail.com")).toBeInTheDocument();
    expect(utils.getByText("Software Developer with almost a year of experience. Looking to work with a group using Node.js or React!")).toBeInTheDocument();
  });
});