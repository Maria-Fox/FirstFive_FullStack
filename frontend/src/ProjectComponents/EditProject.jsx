import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserComponents/UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import { FormGroup, Form, Card, Label, Input, Button } from "reactstrap";
import "./EditProject.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used


const EditProject = () => {

  // ***************************************************************


  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  // ***************************************************************


  let project_values = {
    "owner_username": "",
    "name": "",
    "project_desc": "",
    "timeframe": "",
    "github_repo": ""
  }

  const [projData, setProjData] = useState(project_values);
  const [errors, setErrors] = useState(null);
  const [acknowledgeUserChange, setAcknowledgeUserChange] = useState(false);


  // ***************************************************************


  useEffect(() => {
    async function preloadProjData() {
      try {
        let response = await API.viewProject(id);
        setProjData(
          {
            "name": response.name,
            "owner_username": response.owner_username,
            "project_desc": response.project_desc,
            "timeframe": response.timeframe,
            "github_repo": response.github_repo
          });

      } catch (e) {
        setErrors(e);
        return;
      }
    }

    preloadProjData();
  }, [setProjData, authUser, id]);

  // ***************************************************************


  let handleChange = (e) => {
    let { name, value } = e.target;
    setProjData(projData => ({
      ...projData,
      [name]: value
    }));
  };

  // ***************************************************************

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      
      if(projData.owner_username !== authUser){
        if(!acknowledgeUserChange){
          console.log("says user change")
          setErrors(["There was a change to the project owner. To proceed, please acknowledge the change by clicking the box below and re-submit. If you did not mean to make changes please update the field to your current username."])
          return;
        };
      }

      await API.editProject(id, projData);
      navigate(`/projects/created/by/${authUser}`);
    } catch (e) {
      console.log("er have an err", e)
      setErrors(e);
      return;
    };
  };

    // ***************************************************************

    const confirmProjectOwnerChange = (
      <div >
      <Button id = {acknowledgeUserChange ? "approved" : "notApproved"}
        onClick={() => setAcknowledgeUserChange(currentStatus => !currentStatus)} >
          <FontAwesomeIcon icon={regular('circle-check')} />
        </Button>

      <p style={{display: "inline-block"}}>I acknowledge once I transfer ownership I will not have access to update any project details including project members.</p>
    
      </div>
    )


  // ***************************************************************

  return (
    <div>
      {!projData ? <p>Loading...</p> :
        <div className="container">
          <h1 className="text-center text-white pt-2 mt-2">Update: {projData.name}</h1>

          <Card >
            {errors ? <AlertNotification messages={errors} /> : null}

            <Form onSubmit={handleSubmit} className="p-4">

              <FormGroup>
                <Label htmlFor="name" >Project Name
                  <Input
                    type="text"
                    id="name"
                    value={projData.name}
                    name="name"
                    required
                    onChange={handleChange}
                  >
                  </Input>
                </Label>
              </FormGroup>


              <FormGroup>
                <Label htmlFor="owner_username" >Project Owner
                  <Input
                    type="text"
                    id="owner_username"
                    value={projData.owner_username}
                    name="owner_username"
                    required
                    onChange={handleChange}
                  >
                  </Input>
                </Label>
              </FormGroup>

              {projData.owner_username !== authUser ? confirmProjectOwnerChange : null}

              <FormGroup>
                <Label htmlFor="project_desc" >Project Description
                  <Input
                    type="textarea"
                    id="project_desc"
                    value={projData.project_desc}
                    name="project_desc"
                    required
                    cols="35"
                    rows="8"
                    onChange={handleChange}
                  >
                  </Input>
                </Label>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="timeframe" >Timeframe
                  <Input
                    type="text"
                    id="timeframe"
                    value={projData.timeframe}
                    name="timeframe"
                    placeholder="3 weeks"
                    required
                    onChange={handleChange}
                  >
                  </Input>
                </Label>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="github_repo" >Github Repo
                  <Input
                    type="text"
                    id="github_repo"
                    value={projData.github_repo}
                    name="github_repo"
                    onChange={handleChange}
                  >
                  </Input>
                </Label>
              </FormGroup>

              <Button type="submit">Submit</Button>

            </Form>
          </Card>
        </div>
      }
    </div>
  )
};

export default EditProject;