import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import './index.css'
import About from "./pages/About.jsx";
import Users from "./pages/Users/Users.jsx";
import UserInfo from "./pages/Users/UserInfo.jsx";
import Companies from "./pages/Companies/Companies.jsx";
import CompanyInfo from "./pages/Companies/CompanyInfo.jsx";
import LanguageInitializer from "./hooks/LanguageInitializer.jsx";
import Welcome from "./pages/Welcome.jsx";

// eslint-disable-next-line no-unused-vars
import i18n from "./utils/i18n.js"

const router = createBrowserRouter([
    {
        path: "/info",
        element: <Welcome/>
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
        path: "/companies/:id",
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
