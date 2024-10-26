import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import './index.css'
import Hello from "./pages/Hello.jsx";
import About from "./pages/About.jsx";
import Users from "./pages/Users/Users.jsx";
import UserInfo from "./pages/Users/UserInfo.jsx";
import Companies from "./pages/Companies/Companies.jsx";
import CompanyInfo from "./pages/Companies/CompanyInfo.jsx";
import i18n from "./utils/i18n.js"
import LanguageInitializer from "./hooks/LanguageInitializer.jsx";

const router = createBrowserRouter([
    {
        path: "/info",
        element: <Hello/>
    },
    {
        path: "/about",
        element: <About/>
    },
    {
        path: "/users",
        element: <Users/>
    },
    {
        path: "/users/:id",
        element: <UserInfo/>
    },
    {
        path: "/companies",
        element: <Companies/>
    },
    {
        path:"/companies/:id",
        element: <CompanyInfo/>
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CssBaseline/>
        <LanguageInitializer/>
        <RouterProvider router={router}/>
    </StrictMode>,
)
