import { render, waitFor } from "@testing-library/react";
import SingleMsgDetails from "./SingleMsgDetail";
import UserContext from "../UserComponents/UserContext";
import { userWithMatchState } from "../TestUtils";
import { MemoryRouter } from "react-router-dom";
import API from "../API";
jest.mock("../API");

describe("<SingleMsgDetail />", function () {

  test("Renders w/o crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <SingleMsgDetails />
        </UserContext.Provider>
      </MemoryRouter>
    )
  });


  test("Component renders with API data", function () {

    API.mockImplementationOnce(() => {
      return {
        request: () => {
          return {
            msgDetails: {
              "id": 22,
              "from_user": {
                "username": "softwareDev1",
                "from_bio": "softwareDev1's bio"
              },
              "to_user": {
                "username": "Second user",
                "to_bio": "second bio"
              },
              "body": "Message to second.",
              "sent_at": "2023-02-06T23:17:53.948Z"
            }
          }
        }
      }
    });

    let renderedBody = (
      <MemoryRouter>
        <UserContext.Provider value={userWithMatchState}>
          <SingleMsgDetails />
        </UserContext.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(renderedBody.getByText("Second user")).tobeInTheDocument();
      expect(renderedBody.getByText("Message to second."))
    })
  });

});
