import React, { useEffect } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from "../App"
import Login from "../pages/Auth/Login"
import StudentDashboard from '../pages/Student/StudentDashboard'
import TeacherDashboard from '../pages/Teacher/TeacherDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import EventAdminDashboard from '../pages/EventAdminDashboard'
import Signup from '../pages/Auth/SignUp'
import OrganizationalAdminDashboard from '../pages/OrganizationalAdminDashboard'


const RootRedirect = () => {
    useEffect(() => {
        try {
            localStorage.clear();
        } catch (e) {}
    }, []);

    return <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            { index: true, element: <RootRedirect /> },
            { path: "login", element: <Login/> },
            { path: "forgot-password", element: <Navigate to="/login" replace /> },
            { path: "student", element: <StudentDashboard/> },
            { path: "teacher", element: <TeacherDashboard/> },
            { path:"admin",element: <AdminDashboard/>},
            {path:"eventadmin",element:<EventAdminDashboard/>},
            {path:"signup",element:<Signup/>},
            {path:"orgadmin",element:<OrganizationalAdminDashboard/>},
            { path: "*", element: <Navigate to="/login" replace /> },
        ]
    },
])

export default router