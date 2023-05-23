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
  Button
} from "reactstrap";

const RegisterForm = ({ registerUser }) => {


  // ***************************************************************

  let initial_state = {
    username: null,
    password: null,
    email: null,
    bio: null
  };

  let navigate = useNavigate();

  let [formData, setFormData] = useState(initial_state);
  let [errors, setErrors] = useState();

  // ***************************************************************

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  };

  // ***************************************************************

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await registerUser(formData);

    if (response.success) {
      navigate("/home");
    } else {
      setErrors([response.errors]);
    };
  };

  // ***************************************************************


  return (
    <div className="container">
      <h2 className="mb-3 text-white mt-5">Register</h2>

      <Card>

        {errors ? <AlertNotification messages={errors} /> : null}

        <CardBody>
          <Form className="container">
            <FormGroup  >
              <Label for="username" className="mt-2">Username
              </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange} />
            </FormGroup>

            <FormGroup >
              <Label for="password" className="mt-2">Password
              </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="on"
                  placeholder="@ least 6 characters"
                  onChange={handleChange}
                  minLength = "6"
                  className="RegisterInput" />
              
            </FormGroup>

            <FormGroup >
              <Label for="email" className="mt-2">Email
              </Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email@aol.com"
                  required
                  onChange={handleChange} />
            </FormGroup>

            <FormGroup >
              <Label for="bio" className="mt-2">Bio
              </Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  placeholder="CS student"
                  onChange={handleChange} />
            </FormGroup>


            <Button onClick={handleSubmit} >Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div >
  );
};

export default RegisterForm;