import React from "react";
import PathConstants from "./pathConstants";
import PrivateRoutes from "../components/routes/PrivateRoutes";

const HomePage = React.lazy(() => import("../pages/Home"));
const RegisterPage = React.lazy(() => import("../pages/Register"));
const AboutUsPage = React.lazy(() => import("../pages/AboutUs"));
const AddStudentPage = React.lazy(() => import("../pages/Addstudent"));
const LoginPage = React.lazy(() => import("../pages/Login"));
const ViewStudentsPage = React.lazy(() => import("../pages/viewstudents"));
const StudentViewPage = React.lazy(() => import("../pages/StudentView"));
const StudentEditPage = React.lazy(() => import("../pages/StudentDetails"));
const ProfilePage = React.lazy(() => import("../pages/Profile"));
const routes = [
  { path: "/", element: <HomePage /> },
  { path: PathConstants.HOME, element: <HomePage /> },
  { path: PathConstants.REGISTER, element: <RegisterPage /> },
  { path: PathConstants.ABOUTUS, element: <AboutUsPage /> },
  { path: PathConstants.LOGIN, element: <LoginPage /> },

  {
    element: <PrivateRoutes />,
    children: [
      { path: PathConstants.ADD_STUDENT, element: <AddStudentPage /> },
      { path: PathConstants.VIEWSTUDENTS, element: <ViewStudentsPage /> },
      { path: PathConstants.STUDENT_DETAILS, element: <StudentViewPage /> },
      { path: PathConstants.STUDENT_EDIT, element: <StudentEditPage /> },
      { path: PathConstants.PROFILE, element: <ProfilePage /> },
    ],
  },
];

export default routes;
