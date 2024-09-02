import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams.js";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice.js";
import PageTitle from "../../../components/PageTitle.js";
import { useNavigate } from "react-router-dom";
import { Col, message, Row } from "antd";

function Home() {
    const [exams, setExams] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);

    const getExams = async() => {
        try {
            dispatch(ShowLoading());
            const response = await getAllExams();
            if (response.success) {
                setExams(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getExams();
    }, []);

    // Function to filter exams based on search query
    const filteredExams = exams.filter((exam) =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        user && ( <
            div >
            <
            PageTitle title = { `Hi ${user.name}, Welcome to Quizup` }
            />  <
            div className = "divider" > < /div>  <
            input type = "text"
            placeholder = "Search exams..."
            value = { searchQuery }
            onChange = {
                (e) => setSearchQuery(e.target.value) }
            /> <
            div className = "divider" > < /div>  <
            Row gutter = {
                [16, 16] } > {
                filteredExams.map((exam) => ( <
                    Col span = { 6 }
                    key = { exam._id } >
                    <
                    div className = "card-lg flex flex-col gap-1 p-2" >
                    <
                    h1 className = "text-2xl" > { exam && exam.name } < /h1>

                    <
                    h1 className = "text-md" > Category: { exam.category } < /h1>

                    <
                    h1 className = "text-md" > Total Marks: { exam.totalMarks } < /h1>  <
                    h1 className = "text-md" > Passing Marks: { exam.passingMarks } < /h1> <
                    h1 className = "text-md" > Duration: { exam.duration } < /h1>

                    <
                    button className = "primary-outlined-btn"
                    onClick = {
                        () => navigate(`/user/write-exam/${exam._id}`)
                    } >
                    Start Exam <
                    /button> <
                    /div>  <
                    /Col>
                ))
            } <
            /Row> <
            /div>
        )
    );
}

export default Home;