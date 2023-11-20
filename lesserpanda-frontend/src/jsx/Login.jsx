import React from 'react';
import {Header} from './Header';
import {banner} from './Banner';
import '../css/Login.css';
import {useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import ReactDOM from "react-dom";

// axios.defaults.baseURL = "http://43.202.247.199:3000/";


function Login(){

    const [Sign, setSign] = useState(
        {
            loginId:"test@naver.com",
            loginPassword:"1234",
        }
    );

    const navigate = useNavigate();


    const handleSignup = (event) => {
        navigate("/SignUp");    //회원가입으로 이동
    }
    const handleClick = (event) => {
        event.preventDefault();

        axios.post('http://43.202.247.199:8080/auth/login', Sign).then((response) => {
            const accessToken = response.data.accessToken;
            console.log("TOken ; " + accessToken);
            if (response.status === 200) {

                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                // localStorage.setItem("accessToken", axios.defaults.headers.common["Authorization"]);
                localStorage.setItem("accessToken", accessToken);

                axios.post('http://43.202.247.199:8080/auth/login', Sign).then((response) => {
                    console.log("TOken ; " + accessToken);
                })
            }
            console.log("accessToken : " +accessToken);
            navigate('/Profile');
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleChange2 =  async (e) => {
        Sign.loginPassword = e.target.value;
    };

    const handleChange1 =  async (e) => {
        Sign.loginId = e.target.value;
    };

    return (
        <div>
            {Header()}
            <main>
                <div className='login_main'>
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}> 로그인 </span>
                    <div className='login_txt-line'/> {/*로그인 아래 줄*/}

                    <form className='login_form'>
                        <div className='login_form_input-block'>
                            <label htmlFor='email' className='login_form_label'>이메일</label>
                            <div className='login_form_input-whiteBox'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    onChange={handleChange1}
                                />
                            </div>
                        </div>
                        <div className='login_form_input-block'>
                            <label htmlFor='password' className='login_form_label'>비밀번호</label>
                            <div className='login_form_input-whiteBox'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    onChange={handleChange2}
                                />
                            </div>
                        </div>
                        <div className='login_form_input-block' style={{margin: '0 auto 50px'}}>
                            <button className='login_btnLogin' onClick={handleClick}>로그인</button>
                        </div>


                        <div className='login_form_input-block'>
                            <span id='txt_gray'>OOO가 처음이신가요?</span>
                            <button onClick={handleSignup} className='login_btnSignup'>회원가입</button>
                        </div>
                    </form>
                    <div className='login_white-line'></div> {/*흰색 줄*/}

                    <img src='images/login_proplat_img.svg' className='login_proplat-img'/>

                    <img src='images/login_sopt_img.svg' className='login_sopt-img'/>
                </div>
            </main>
            {banner()}
        </div>
    );
}

export default Login;