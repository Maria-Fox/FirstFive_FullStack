import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
// import "./UserProfile.css";
import { Card, Form, FormGroup, Label, Input, Button } from "reactstrap";

const UpdateProfileForm = () => {

  const { authUser } = useContext(UserContext);
  const { username } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState(null);

  // ***************************************************************

  useEffect(() => {
    async function confirmPermission() {
      if (authUser !== username) {
        // If not the appropriate user then redirect to that users page.
        navigate(`/users/update/${authUser}`);
      };

      let userData = await API.viewAuthUserProfile(username);

      // Fill form with current data.
      setFormData({
        username: userData.username,
        password: "",
        email: userData.email,
        bio: userData.bio
      });


    };
    confirmPermission();
  }, [setFormData]);

  // ***************************************************************

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await API.editUser(authUser, formData);
      navigate(`/users/${authUser}/profile`);
    } catch (err) {
      setFormErrors(err);
      return;
    }
  }

  // ***************************************************************

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  };

  // ***************************************************************

  return (
    <div>
      {formErrors ? <AlertNotification messages={formErrors} /> : null}

      <h1 className="text-center text-white pt-2 mt-2"> Update Profile</h1>

      <Card className="container text-center">
        {formData ?
          <Form onSubmit={handleSubmit}>

            <FormGroup>
              <Label htmlFor="username" >Username
                <Input
                  type="text"
                  id="username"
                  value={formData.username}
                  name="username"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password" >Password
                <Input
                  type="password"
                  id="password"
                  value={formData.password}
                  name="password"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="Email" >Email
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  name="email"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="bio" >Bio
                <Input
                  type="text"
                  id="bio"
                  value={formData.bio}
                  name="bio"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <Button outline color="info" type="submit" className="m-2">
              Update
            </Button>

          </Form>
          :
          <p>Loading....</p>}

      </Card>
    </div>
  )
};

export default UpdateProfileForm;
