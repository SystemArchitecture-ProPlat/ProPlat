import '../css/Header.css';
import React from 'react';
import {useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import {useCookies}from 'react-cookie'


export function Header() {

    const navigate = useNavigate();

    const naviClub = () => {
        navigate('/');
    }

    const naviProject = () => {
        navigate('/ProjectMain');
    }

    const naviProfile = () => {
        navigate('/Profile');
    }

    const naviLoginTest = () => {
        navigate('/Login');
    }

    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    const clear = () => {
        navigate('/Login');
        window.location.reload();
        localStorage.clear();
    }

    const tokenCheck =  () => {
                if(token){
                    return <span onClick={clear} style={{marginRight:'10px', cursor:'pointer'}}>로그아웃</span>
                }
                else{
                    return <span onClick={naviLoginTest} style={{marginRight:'10px', cursor:'pointer'}}>로그인</span>
                }
            };

    return (
        <div className="header">
            <header>
                <h1 style={{cursor:'pointer'}} onClick={naviClub}>Home</h1>
                <nav>
                    <span style={{marginRight:'50px', cursor:'pointer'}} onClick={naviClub}>동아리</span>
                    <span style={{marginRight:'50px', cursor:'pointer'}} onClick={naviProject}>프로젝트</span>
                </nav>
                <nav>
                        {tokenCheck()}
                    <span style={{cursor:'pointer'}} onClick={naviProfile}>마이페이지</span>
                </nav>
            </header>
        </div>
    );
}