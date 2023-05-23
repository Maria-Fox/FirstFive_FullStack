import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../Common/AlertNotifications";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Button,
} from "reactstrap";

const LoginForm = ({ authenticateuser }) => {

  // ***************************************************************

  let navigate = useNavigate();

  let initial_state = {
    "username": "",
    "password": ""
  };

  let [formData, setFormData] = useState(initial_state);
  let [formErrors, setFormErrors] = useState(null);

  // ***************************************************************


  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  // ***************************************************************

  let handleSubmit = async (e) => {
      e.preventDefault();
      let response = await authenticateuser(formData);
      
      if (response.success) {
        navigate(`/configure`);
      } else {
        setFormErrors(response.errors);
        return;
      };
  };

  // ***************************************************************


  return (
    <div className="container" >

      <h2 className="mb-3 text-white mt-5">Login</h2>
      <Card>

        {formErrors ? <AlertNotification messages={formErrors} /> : null}

        <CardBody>
          <Form  >
            <FormGroup>
              <Label for="username" className="mt-3">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                onChange={handleChange}
              />

              <Label for="password" className="mt-3">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="on"
                onChange={handleChange}
              />
            </FormGroup>


            <Button type="submit" onClick={handleSubmit}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div >
  )
};

export default LoginForm;