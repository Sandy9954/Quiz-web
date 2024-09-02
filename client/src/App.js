import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Exams from "./pages/admin/Exam/index.js";
import AddEditExam from "./pages/admin/Exam/addEditExams.js";
import AdminReports from "./pages/admin/AdminReports/index.js";
import Home from "./pages/common/home/home.js";
import Login from "./pages/common/Login/index.js";
import Register from "./pages/common/Register/index.js";
import UserReports from "./pages/user/UserReports/index.js";
import WriteExam from "./pages/user/WriteExam/index.jsx";
import Profile from './pages/profile.js';

import 'remixicon/fonts/remixicon.css';
import "./stylesheet/theme.css";
import "./stylesheet/alignments.css";
import "./stylesheet/textelements.css";
import "./stylesheet/custom-components.css";
import "./stylesheet/form-elements.css";
import "./stylesheet/layout.css";

function App() {
    const { loading } = useSelector(state => state.loader);

    return ( <
            div > { loading && < Loader / > } <
            BrowserRouter >
            <
            Routes >
            <
            Route path = '/login'
            element = { < Login / > }
            /> <
            Route path = '/register'
            element = { < Register / > }
            /> <
            Route path = '/hello'
            element = { < ProtectedRoute > < Home / > < /ProtectedRoute>} / >
                <
                Route path = "/user/write-exam/:id"
                element = { < ProtectedRoute > < WriteExam / > < /ProtectedRoute>} / >
                    <
                    Route path = "/user/reports"
                    element = { < ProtectedRoute > < UserReports / > < /ProtectedRoute>} / >
                        <
                        Route path = '/admin/exams'
                        element = { < ProtectedRoute > < Exams / > < /ProtectedRoute>} / >
                            <
                            Route path = '/admin/exams/add'
                            element = { < ProtectedRoute > < AddEditExam / > < /ProtectedRoute>} / >
                                <
                                Route path = "/admin/exams/edit/:id"
                                element = { < ProtectedRoute > < AddEditExam / > < /ProtectedRoute>} / >
                                    <
                                    Route path = "/admin/reports"
                                    element = { < ProtectedRoute > < AdminReports / > < /ProtectedRoute>} / >
                                        <
                                        Route path = "/user/profile"
                                        element = { < ProtectedRoute > < Profile / > < /ProtectedRoute>} / >
                                            <
                                            /Routes> <
                                            /BrowserRouter> <
                                            /div>
                                        );
                                    }

                                    export default App;