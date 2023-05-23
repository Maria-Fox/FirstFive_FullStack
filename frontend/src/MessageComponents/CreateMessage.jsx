import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import UserContext from "../UserComponents/UserContext";
import { Form, Label, Input, Button, Card } from "reactstrap"

const CreateMessage = () => {

  // message from, message_to
  const { to_username } = useParams();

  // ***************************************************************

  let initial_state = {
    message_to: to_username,
    body: ""
  };

  // ***************************************************************

  const [msgData, setMsgData] = useState(initial_state);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const handleChange = async (e) => {
    let { name, value } = e.target;

    setMsgData(msgData => ({
      ...msgData,
      [name]: value
    }));
  };

  // ***************************************************************


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await API.createMessage(authUser, { message_from: authUser, ...msgData });
      navigate(`/messages/${authUser}/all`);
    } catch (e) {
      setErrors(e);
      return;
    };
  };


  // ***************************************************************


  return (
    <>
      <h1 style={{ textAlign: "center" }}>New Message</h1>
      <Card>

        {errors ? <AlertNotification messages={errors} /> : null}

        <Form onSubmit={handleSubmit} >

          <p style={{ color: "navy", fontSize: "1.5rem" }}>Message to: {to_username}</p>

          <Label htmlFor="body" >
            <Input
              type="textarea"
              id="body"
              value={msgData.body}
              name="body"
              placeholder="Hi - I am interested in hearing more about your project. I have frontend expereince. Can you use a new project member?"
              required
              cols="100"
              rows="10"
              onChange={handleChange}
            >
            </Input>
          </Label>

          <br />
          <Button>Send</Button>

        </Form>
      </Card >
    </>
  )
};

export default CreateMessage;