import React, {useState, useRef, useEffect} from 'react';
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import {TextField} from '@material-ui/core';
import axios from "axios";


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

function Profile(){

    const [isBold, setIsBold] = useState(false);
    const [tech, setTech] = useState([]);

    const [info, setInfo] = useState([]);
    const [infoTech, setInfoTech] = useState([]);
    const [num, setNum] = useState('');
    const phoneRef = useRef();
    const [items, setItems] = useState([]); // 배열 상태 초기화
    const [envTech, setEnvTech] = useState([]);
    const [roleTech, setRoleTech] = useState([]);
    const jwtToken = localStorage.getItem('accessToken');

    const toggleBold = (e) => {
        setIsBold(!isBold);

        if (items.includes(e.target.textContent)) {
            // 아이템이 이미 배열에 있는 경우 제거
            const updatedItems = items.filter(item => item !== e.target.textContent);
            setItems(updatedItems);
        } else {
            // 아이템이 배열에 없는 경우 추가
            setItems([...items, e.target.textContent]);
        }
        console.log(items);
    };


    // 휴대폰 번호 입력 함수
    const handlePhone = (e) => {
        const value = phoneRef.current.value.replace(/\D+/g, "");
        const numberLength = 11;
        let result;
        result = "";

        for (let i = 0; i < value.length && i < numberLength; i++) {
            switch (i) {
                case 3:
                    result += "-";
                    break;
                case 7:
                    result += "-";
                    break;

                default:
                    break;
            }
            result += value[i];
        }
        phoneRef.current.value = result;
        setNum(e.target.value);
    };

    //스택 선택시 배열에 담기


    useEffect(() => {
        const profileInfo = async () => {
            // const headers = {
            //     Authorization: localStorage.getItem('accessToken'),
            // };

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

    return (
        <div>
            {Header()}
            <main>
                <div className='signup_main'>
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}> 프로필 </span>
                    <div className='signup_txt-line'/> {/*회원가입 아래 줄*/}

                    <form className='signup_form'>
                        <div className='signup_form_input-block'>
                            <label htmlFor='email' className='signup_form_label'>이메일</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox' id='signup_email'>
                                <text id='signup_form_email_txt'
                                      type='text'
                                ></text>

                                <text id='signup_form_email_txt'
                                      type='text'
                                >{info.loginId}</text>
                            </div>
                        </div>


                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>휴대폰</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <text
                                    type='tel'
                                >{info.phoneNumber}</text>
                            </div>
                        </div>

                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>닉네임</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {/*{info.map(item=>{*/}
                                {/*    return <text*/}
                                {/*        type='text'*/}
                                {/*    >{info.nickname}</text>;*/}
                                {/*})}*/}
                                {info.nickname}
                            </div>
                        </div>
                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>본인파트</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                {tech.map(itemTech => {
                                    if (itemTech.type === 'ENVIRONMENT') {
                                        return <p className='signup_form_part' onClick={toggleBold}
                                           style={{
                                               cursor: 'pointer',
                                               fontWeight: 'bold',
                                               color: '#000000'
                                           }}>#{itemTech.name}</p>
                                    }})
                                }


                            </div>
                        </div>
                        <div className='signup_form_input-block'>
                            <p style={{ display: 'inline-block', textAlign: 'right', width: '87px', marginLeft: '15px'}}></p>
                            <div className='signup_form_input-whiteBox'>
                                {tech.map(itemTech => {
                                    if (itemTech.type === 'ROLE') {
                                        if (!((itemTech.name).includes(roleTech))) {
                                            infoTech.map((itemInfoTech, index) => {
                                                if (itemTech.name === itemInfoTech.name) {
                                                    return <p className='signup_form_part' onClick={toggleBold}
                                                              style={{
                                                                  cursor: 'pointer',
                                                                  fontWeight: 'bold',
                                                                  color: '#000000'
                                                              }}>#{itemTech.name}</p>
                                                }
                                                else {
                                                    return <p className='signup_form_part' onClick={toggleBold}
                                                              style={{
                                                                  cursor: 'pointer',
                                                                  fontWeight: 'normal',
                                                                  color: '#bababa'
                                                              }}>#{itemTech.name}</p>
                                                }
                                                //setRoleTech([...roleTech, itemInfoTech.name]);
                                            })
                                        }
                                    }
                                })
                                }
                            </div>
                        </div>

                        <div className='signup_form_input-blockIntro'>
                            <label className='signup_form_label'>소개</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBoxIntro'>
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <text
                                        style={{width:'350px'}}
                                    >{info.introduce}</text>
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
                            <p style={{display:'inline-block', color:'#666666'}}>이용약관동의</p>
                            <div className='signup_line'/>
                        </div>

                    </form>

                </div>
            </main>
            {banner()}
        </div>
    );
}

export default Profile;