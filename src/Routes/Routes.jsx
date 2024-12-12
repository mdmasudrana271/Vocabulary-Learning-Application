import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Tutorial from "../pages/Tutorial/Tutorial";
import Lessons from "../pages/Lessons/Lessons";
import LessonsCard from "../pages/Lessons/LessonsCard";
import PrivateRoute from "./PrivateRoute";
import DashBoardLayout from "../Layout/DashboardLayout";
import AddLesson from "../pages/AdminDashboard/AddLesson/AddLesson";
import AdminRoute from "./AdminRoute";
import AddVocabulary from "../pages/AdminDashboard/AddVocabulary/AddVocabulary";
import LessonManagement from "../pages/AdminDashboard/LessonManagement/LessonManagement";
import ManageUsers from "../pages/AdminDashboard/ManageUsers/ManageUsers";
import VocabularyManagement from "../pages/AdminDashboard/VocabularyManagement/VocabularyManagement";
import UpdateVocabulary from "../pages/AdminDashboard/VocabularyManagement/UpdateVocabulary";
import UpdateLesson from "../pages/AdminDashboard/LessonManagement/UpdateLesson";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "signup",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "userDashboard",
    element: (
      <PrivateRoute>
        <Main></Main>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/userDashboard/lessons",
        element: (
          <PrivateRoute>
            <Lessons></Lessons>
          </PrivateRoute>
        ),
      },
      {
        path: "/userDashboard/tutorial",
        element: (
          <PrivateRoute>
            <Tutorial></Tutorial>
          </PrivateRoute>
        ),
      },
      {
        path: "/userDashboard/lessons/vocabulary/:lessonNumber",
        element: (
          <PrivateRoute>
            <LessonsCard></LessonsCard>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/vocabulary/${params.lessonNumber}`),
      },
    ],
  },
  {
    path: "adminDashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/adminDashboard/addlessons",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddLesson></AddLesson>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/addvucabulary",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddVocabulary></AddVocabulary>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/lessonsmanagement",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <LessonManagement></LessonManagement>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/manageusers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/vocabularymangement",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <VocabularyManagement></VocabularyManagement>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/vocabularymangement/update/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateVocabulary></UpdateVocabulary>
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/word/${params.id}`),
      },
      {
        path: "/adminDashboard/lessonsmangement",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <LessonManagement></LessonManagement>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/lessonsmangement/update/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateLesson></UpdateLesson>
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/lesson/${params.id}`),
      },
    ],
  },
]);
