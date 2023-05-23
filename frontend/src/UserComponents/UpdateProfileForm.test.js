import React from "react";
import { MemoryRouter } from "react-router-dom";
import UpdateProfileForm from "./UpdateProfileForm";
import UserContext from "./UserContext";
import { authUser } from "../TestUtils";
import { render, waitFor } from "@testing-library/react";
import API from "../API";
// Mock API
jest.mock("../API")

test("Smoke- Renders form for valid user", function () {

  const authUser = { username: "softwareDev1" };

  render(
    <MemoryRouter>
      <UserContext.Provider value={authUser}>
        <UpdateProfileForm />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

test("Component populates form w current userData", function () {
  // Mock API call & respons data. Retrieving username through params.

  // the component holds the response value as an object (userData) then updates that with that.

  API.mockImplementationOnce(() => {
    return {
      request: () => {
        return { userData: { username: "softwareDev1", email: "email@aol.com", bio: "bio" } };
      },
    };
  });

  const renderedBody = render(
    <UserContext.Provider value={authUser}>
      <MemoryRouter>
        <UpdateProfileForm />
      </MemoryRouter>
    </UserContext.Provider>
  );

  waitFor(() => {
    expect(renderedBody.getByText("email@aol.com")).toBeInTheDocument();
    expect(renderedBody.getByText("OG bio")).toBeInTheDocument();
  });
});