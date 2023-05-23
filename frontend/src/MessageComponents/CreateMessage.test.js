import React from "react";
import { MemoryRouter } from "react-router-dom";
import CreateMessage from "./CreateMessage";
import { render, getByText } from "@testing-library/react";
import UserContext from "../UserComponents/UserContext";


test("Smoke - renders the CreateMessageForm", function () {

  const authUser = { username: "softwareDev1" };

  render(
    <MemoryRouter>
      <UserContext.Provider value={authUser}>
        <CreateMessage />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

test("Snapshot- CreateMsg forms renders for valid user", function () {

  const authUser = { username: "softwareDev1" }
  let { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={authUser}>
        <CreateMessage />
      </UserContext.Provider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

