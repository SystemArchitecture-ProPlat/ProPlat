import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchAuto from "./jsx/SearchAuto";
import ProfileModify from "./jsx/ProfileModify";
import ProjectMain from "./jsx/ProjectMain";
import ClubMain from "./jsx/ClubMain";
import Collect from "./jsx/Collect";
import ProjectContent from "./jsx/ProjectContent";
import Login from "./jsx/Login";
import SignUp from "./jsx/SignUp";

import Profile from "./jsx/Profile";
import Clock from "./jsx/Clock";
import Background from "./jsx/Background";
import ImageInsert from "./jsx/ImageInsert";
import Pageable from "./jsx/Pageable";

import React from 'react'
import PaginationPost from "./jsx/PaginationPost";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ClubMain />} />  {/*동아리 소개*/}
                    <Route path="/ProfileModify" element={<ProfileModify />} />  {/*프로필 수정 ok*/}
                    <Route path="/Profile" element={<Profile />} />   {/*프로필 보기 ok*/}
                    <Route path="/Collect" element={<Collect />} />   {/*프로젝트 지원*/}
                    <Route path="/ProjectContent/:id" element={<ProjectContent />} />   {/*프로젝트 모집글가서 댓글*/}
                    <Route path="/ProjectMain" element={<ProjectMain />} />   {/*프로젝트 메인창*/}
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />

                    {/*<테스트용 페이지>*/}
                    <Route path="/SearchAuto" element={<SearchAuto />} />
                    <Route path="/Clock" element={<Clock />} />
                    <Route path="/Background" element={<Background />} />
                    <Route path="/ImageInsert" element={<ImageInsert />} />
                    <Route path="/Pageable" element={<Pageable />} />
                    <Route path="/PaginationPost" element={<PaginationPost />} />

                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;