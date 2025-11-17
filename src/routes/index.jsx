import {createBrowserRouter} from 'react-router-dom'
import App from "../App"
import Login from "../pages/Login"
import Signup from '../pages/Signup'


const router=createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                path:"signup",
                element:<Signup/>
            },
            {
                path:"login",
                element:<Login/>
            }
        ]
    }
])

export default router