import React, {useState, useRef, useEffect} from 'react';
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import {TextField} from '@material-ui/core';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const cellStyle = {
    // width:'200px',
    // height:'300px',
    flex:'1',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex'
};

const rowStyle = {
    width:'600px',
    display: 'flex',
    marginTop:'10px',
    borderBottom: '1px solid #ccc', // 행 구분선 스타일 설정
};

function ProfileModify(){

    const navigate = useNavigate();
    const [styles, setStyles] = useState({});
    const [isBold1, setIsBold1] = useState(false);
    const [isBold2, setIsBold2] = useState(false);
    const [isBold3, setIsBold3] = useState(false);
    const [isBold4, setIsBold4] = useState(false);
    const [isBold5, setIsBold5] = useState(false);

    const [items, setItems] = useState([]); // toggle stack
    const [tech, setTech] = useState([]);
    const jwtToken = localStorage.getItem('accessToken');
    const [info, setInfo] = useState([]);
    const [infoTech, setInfoTech] = useState([]);
    const [infoNew, setInfoNew] = useState({
        name: null,
        loginId: null,
        nickname: null,
        phoneNumber: null,
        introduce: null,
        userStackList: [
        ]
    });

    const dynamicStyle1 = {
        cursor:'pointer', fontWeight: isBold1 ? 'bold' : 'normal', color: isBold1 ? '#000000' : '#bababa'
    };
    const dynamicStyle2 = {
        cursor:'pointer', fontWeight: isBold2 ? 'bold' : 'normal', color: isBold2 ? '#000000' : '#bababa'
    };
    const dynamicStyle3 = {
        cursor:'pointer', fontWeight: isBold3 ? 'bold' : 'normal', color: isBold3 ? '#000000' : '#bababa'
    };
    const dynamicStyle4 = {
        cursor:'pointer', fontWeight: isBold4 ? 'bold' : 'normal', color: isBold4 ? '#000000' : '#bababa'
    };
    const dynamicStyle5 = {
        cursor:'pointer', fontWeight: isBold5 ? 'bold' : 'normal', color: isBold5 ? '#000000' : '#bababa'
    };

    const toggleBold = (e) => {
        // setIsBold(!isBold);
        console.log("id : " + e.target.id);
        if(e.target.id === '0')
        {
            if (items.includes(e.target.textContent)) {
                // 아이템이 이미 배열에 있는 경우 제거
                const updatedItems = items.filter(item => item !== e.target.textContent);
                setItems(updatedItems);
                console.log(items);
            } else {
                // 아이템이 배열에 없는 경우 추가
                setItems([...items, e.target.textContent]);
                console.log(items);
            }

        }
        else if(e.target.id === '1')
        {
            if (items.includes(e.target.textContent)) {
                // 아이템이 이미 배열에 있는 경우 제거
                const updatedItems = items.filter(item => item !== e.target.textContent);
                setItems(updatedItems);
                console.log(items);
            } else {
                // 아이템이 배열에 없는 경우 추가
                setItems([...items, e.target.textContent]);
                console.log(items);
            }
        }
        else if(e.target.id === '2')
        {
            if (items.includes(e.target.textContent)) {
                // 아이템이 이미 배열에 있는 경우 제거
                const updatedItems = items.filter(item => item !== e.target.textContent);
                setItems(updatedItems);
                console.log(items);
            } else {
                // 아이템이 배열에 없는 경우 추가
                setItems([...items, e.target.textContent]);
                console.log(items);
            }
        }
    };


    const [num, setNum] = useState('');
    const phoneRef = useRef();

    // 휴대폰 번호 입력 함수
    const handlePhone = (e) => {
        info.phoneNumber = e.target.value;
        // info.userStackList = infoChangeTech;
        // const value = phoneRef.current.value.replace(/\D+/g, "");
        // const numberLength = 11;
        // let result;
        // result = "";
        //
        // for (let i = 0; i < value.length && i < numberLength; i++) {
        //     switch (i) {
        //         case 3:
        //             result += "-";
        //             break;
        //         case 7:
        //             result += "-";
        //             break;
        //
        //         default:
        //             break;
        //     }
        //     result += value[i];
        // }
        // phoneRef.current.value = result;
        // setNum(e.target.value);
    };

    const handleNickName = (e) => {
        info.nickname = e.target.value;
    }

    const handleIntroduce = (e) => {
        info.introduce = e.target.value;
    }

    //스택 선택시 배열에 담기


    useEffect(() => {
        const profileInfo = async () => {
            axios.get('http://43.202.247.199:8080/member/my-page', {headers: {
                    // "Content-Type" : 'application/json',
                    Authorization : `Bearer ${jwtToken}`,
                }, withCredentials: true})
                .then(response => {
                    setInfo(response.data);
                    setInfoTech(response.data.userStackList);
                })
                .catch(error => {
                    console.log("fail");
                });
        };

        profileInfo();
    }, []);

    useEffect(() => {
        const techInfo = async () => {
            // const headers = {
            //     Authorization: localStorage.getItem('accessToken'),
            // };

            axios.get('http://43.202.247.199:8080/tech-list')
                .then(response => {
                    setTech(response.data);
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        techInfo();
    }, []);

    const Modify = () => {
        const transformedStackList = info.userStackList.map(stack => stack.name);
        if(infoNew.name === null)
            infoNew.name = info.name;
        if(infoNew.loginId === null)
            infoNew.loginId = info.loginId;
        if(infoNew.nickname === null)
            infoNew.nickname = info.nickname;
        if(infoNew.phoneNumber === null)
            infoNew.phoneNumber = info.phoneNumber;
        if(infoNew.introduce === null)
            infoNew.introduce = info.introduce;
        if(infoNew.userStackList.length === 0 )
        {
            infoNew.userStackList = transformedStackList;
        }




        const modify = async () => {
            const transformedStackList = info.userStackList.map(stack => stack.name);
            const transformedData = {
                ...info,  // 기존 데이터 복사
                userStackList: transformedStackList,  // 변환된 배열 할당
            };
            setInfoNew(transformedData);

            axios.put('http://43.202.247.199:8080/member/update', infoNew, {headers: {
                    // "Content-Type" : 'application/json',
                    Authorization : `Bearer ${jwtToken}`,
                }, withCredentials: true})
                .then(response => {
                    navigate('/Profile');
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        modify();
    }

    return (
        <div>
            {Header()}
            <main>
                <div className='signup_main'>
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}> 프로필 수정 </span>
                    <div className='signup_txt-line'/> {/*회원가입 아래 줄*/}

                    <form className='signup_form'>
                        <div className='signup_form_input-block'>
                            <label htmlFor='email' className='signup_form_label'>이메일</label>
                            <div className='signup_form_input-whiteBox' id='signup_email'>
                                <text id='signup_form_email_txt'
                                      type='text'
                                ></text>

                                <text id='signup_form_email_txt'
                                      type='text'
                                >{info.loginId}</text>
                                {/*<select class="box" id="signup_domain-list">*/}
                                {/*    <option value="type">직접 입력</option>*/}
                                {/*    <option value="naver.com">naver.com</option>*/}
                                {/*    <option value="google.com">google.com</option>*/}
                                {/*    <option value="daum.net">daum.net</option>*/}
                                {/*    <option value="hanmail.net">hanmail.net</option>*/}
                                {/*    <option value="yahoo.com">yahoo.com</option>*/}
                                {/*    <option value="nate.com">nate.com</option>*/}
                                {/*    <option value="kakao.com">kakao.com</option>*/}
                                {/*</select>*/}
                            </div>
                        </div>

                        {/*<div className='signup_form_input-block'>*/}
                        {/*    <label htmlFor='password' className='signup_form_label'>비밀번호</label>*/}
                        {/*    <p className='signup_required'>*</p>*/}
                        {/*    <div className='signup_form_input-whiteBox'>*/}
                        {/*        <input*/}
                        {/*            type='password'*/}
                        {/*            placeholder='Password'*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className='signup_form_input-block'>*/}
                        {/*    <label htmlFor='password' className='signup_form_label'>비밀번호 확인</label>*/}
                        {/*    <p className='signup_required'>*</p>*/}
                        {/*    <div className='signup_form_input-whiteBox'>*/}
                        {/*        <input*/}
                        {/*            type='password'*/}
                        {/*            placeholder='Password'*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>휴대폰</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input
                                    type='tel'
                                    defaultValue={info.phoneNumber}  ref={phoneRef}  onChange={handlePhone}
                                    placeholder='Phone Number'
                                />
                            </div>
                        </div>
                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>닉네임</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input
                                    type='text'
                                    placeholder='Nickname'
                                    defaultValue={info.nickname}
                                    onChange={handleNickName}
                                />
                            </div>
                        </div>


                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>본인파트</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                {/*<p className='signup_form_part' onClick={toggleBold} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#iOS</p>*/}
                                {/*<p className='signup_form_part' onClick={toggleBold} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#Android</p>*/}
                                {/*<p className='signup_form_part' onClick={toggleBold} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#Web</p>*/}
                                {tech.map((item,index)=>{
                                    const envId = `${index}`;
                                    const style = `dynamicStyle${index}`
                                    if(item.type === 'ENVIRONMENT')
                                        return <p id={envId} className='signup_form_part' onClick={toggleBold} style={{style}}>#{item.name}</p>
                                })}
                            </div>
                        </div>
                        <div className='signup_form_input-block'>
                            <p style={{ display: 'inline-block', textAlign: 'right', width: '87px', marginLeft: '15px'}}></p>
                            <div className='signup_form_input-whiteBox'>
                                {/*<p className='signup_form_part'>#Plan</p>*/}
                                {/*<p className='signup_form_part'>#Design</p>*/}
                                {/*<p className='signup_form_part'>#Front-End</p>*/}
                                {/*<p className='signup_form_part'>#Back-End</p>*/}
                                {tech.map((item,index)=>{
                                    const roleId = `${index}`;
                                    if(item.type === 'ROLE')
                                        return <p id={roleId} className='signup_form_part' onClick={toggleBold} style={{roleId}}>#{item.name}</p>

                                })}
                            </div>
                        </div>

                        <div className='signup_form_input-blockIntro'>
                            <label className='signup_form_label'>소개</label>
                            <p className='signup_required'>*</p>
                            {/*<div className='signup_form_input-whiteBox'>*/}
                            {/*    <input*/}
                            {/*        type='text'*/}
                            {/*        placeholder='Nickname'*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<textarea className='signup_form_input-whiteBox'>*/}

                            {/*</textarea>*/}
                            <div className='signup_form_input-whiteBoxIntro'>
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    rows={7}
                                    defaultValue={info.introduce}
                                    style={{width:'350px'}}
                                    onChange={handleIntroduce}
                                />
                                </div>
                            </div>
                        </div>

                        <div className='signup_white-line'></div> {/*흰색 줄*/}

                        <p>내가 쓴 글</p>
                        <div style={rowStyle}>
                            <div style={cellStyle}>셀 1-1</div>
                            <div style={cellStyle}>셀 1-2</div>
                            <div style={cellStyle}>셀 1-3</div>
                        </div>

                        <div className='signup_white-line'></div> {/*흰색 줄*/}

                        <div className='signup_agreement'>
                            <div className='signup_line'/>
                            <button onClick={Modify}>저장</button>
                            <div className='signup_line'/>
                        </div>

                    </form>

                </div>
            </main>
            {banner()}
        </div>
    );
}

export default ProfileModify;