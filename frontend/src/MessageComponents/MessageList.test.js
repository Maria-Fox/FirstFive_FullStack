import { MemoryRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import MessageList from "./MessaageList";
import { UserProvider, userWithMatchState } from "../TestUtils";
import UserContext from "../UserComponents/UserContext";
import API from "../API";
jest.mock("../API");

describe("<MessleList />", function () {
  test("Renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserProvider>
          <MessageList />
        </UserProvider>
      </MemoryRouter>
    )
  });

  test("Populates DOM with projectData", function () {

    API.mockImplementationOnce(() => {
      return {
        request: () => {
          return {
            id: 1,
            message_from: "another_user",
            message_to: "softwareDev1",
            body: "This is the msg body",
            sent_at: "Thursday feb 20, 10:15am"
          }
        }
      }
    });

    let renderedContent = render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <MessageList />
        </UserContext.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(renderedContent.getByText("Message From")).toBeInTheDocument();
    });
  });

})
// https://kpwags.com/posts/2022/07/01/mocking-react-router-and-useparams