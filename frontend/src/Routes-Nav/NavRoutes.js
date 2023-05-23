import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "../UserComponents/RegisterForm";
import LoginForm from "../UserComponents/LoginForm";
import ProjectList from "../ProjectComponents/ProjectList";
import PrivateRoutes from "./PrivateRoutes";
import UserProfile from "../UserComponents/UserProfile";
import CreateProjectForm from "../ProjectComponents/CreateProjectForm";
import ProjectCard from "../ProjectComponents/ProjectCard";
import MatchList from "../MatchComponents/MatchedProjectList";
import MessageList from "../MessageComponents/MessaageList";
import CreateMessage from "../MessageComponents/CreateMessage";
import SingleMsgDetails from "../MessageComponents/SingleMsgDetail";
import MatchedProjectUsers from "../MatchComponents/MatchedUserList";
import ProjectMemberList from "../ProjectMemberComponents/ProjectMemberList";
import EditProject from "../ProjectComponents/EditProject";
import UpdateProfileForm from "../UserComponents/UpdateProfileForm";
import About from "../About/About";
import UserCreatedProjects from "../ProjectComponents/UserCreatedProjectList";
import UpdateProjectMembers from "../ProjectMemberComponents/UpdateProjectMembers";
import ProjectCarousel from "../ProjectComponents/ProjectCarousel";
import Configure from "../Configure/Configure";
import Confetti from "../Confetti/Confetti";
import LandingPage from "../LandingPage/LandingPage";
import NotFound from "../NotFound/NotFound";

const NavRoutes = ({ registerUser, authenticateUser }) => {


  return (
    <Routes>

      {/* Auth user routes - PUBLIC */}
      <Route path="/"
        element={<LandingPage />}>
      </Route>
      <Route path="/auth/register"
        element={<RegisterForm registerUser={registerUser} />}>
      </Route>
      <Route path="/auth/login"
        element={<LoginForm authenticateuser={authenticateUser} />}>
      </Route>
      <Route path="/about"
        element={<About />}>
      </Route>


      {/* PRIVATE ROUTES */}
      <Route element={<PrivateRoutes />}>
        <Route path="/configure" element={<Configure />}></Route>

        {/* User routes*/}
        <Route exact path="/users/:username/profile" element={<UserProfile />}></Route>
        <Route exact path="/users/update/:username" element={<UpdateProfileForm />}></Route>


        {/* Project Routes */}
        <Route path="/projects/add" element={<CreateProjectForm />}></Route>
        <Route path="/projects/umatched" element={<ProjectList />}></Route>
        <Route path="/projects/carousel" element={<ProjectCarousel />}></Route>
        <Route path="/projects/:id" element={<ProjectCard />}></Route>
        <Route path="/projects/edit/:id" element={<EditProject />}></Route>

        {/* Projects created by user */}
        <Route path="/projects/created/by/:username" element={<UserCreatedProjects />}></Route>


        {/* Match Routes */}
        <Route exact path="/matches/:username/all" element={<MatchList />}></Route>
        <Route exact path="/matches/:project_id/users" element={<MatchedProjectUsers />}></Route>

        {/* Project Member Routes */}
        <Route exact path="/projectmembers/:project_id/users" element={<ProjectMemberList />}></Route>
        <Route exact path="/projectmembers/update/:project_id" element={<UpdateProjectMembers />}></Route>


        {/* Message Routes */}
        <Route exact path="/messages/:username/create/:to_username" element={<CreateMessage />}></Route>
        <Route exact path="/messages/:username/all" element={<MessageList />}></Route>
        <Route exact path="/messages/:username/read/:message_id" element={<SingleMsgDetails />}></Route>

        {/* Confetti */}
        <Route path="/confetti"
          element={<Confetti />}>
        </Route>

        {/*Closing private routes. */}
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />}></Route>


    </Routes>
  );
};

export default NavRoutes;