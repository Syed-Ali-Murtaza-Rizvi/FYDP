import {createBrowserRouter} from 'react-router-dom'
import App from "../App"
import Login from "../pages/Login"
import TeacherDashboard from '../pages/TeacherDashboard'
import StudentDashboard from '../pages/StudentDashboard'


const router=createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"teacher",
                element:<TeacherDashboard/>
            },
            {
                path:"student",
                element:<StudentDashboard/>
            }

        ]
    },
    
])

export default router