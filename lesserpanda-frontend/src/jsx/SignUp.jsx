import React, { useState, useRef , useEffect} from 'react';
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";


function SignUp(){

    const [isBold, setIsBold] = useState(false);
    const [selectedOption, setSelectedOption] = useState(''); // 초기 상태는 빈 문자열
    const [loginPasswordCheck, setLoginPasswordCheck] = useState('');
    const [techList, setTechList] = useState([]);

    const navigate = useNavigate();

    const [num, setNum] = useState('');
    // 초기값 세팅 - 이메일, 비밀번호, 비밀번호확인, 전화번호, 닉네임, 약관 동의
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [phone, setPhone] = useState('');
    const phoneRef = useRef();
    const [nickname, setNickname] = useState("");
    const [allAgreed, setAllAgreed] = useState(false);  //전체 동의
    const [agreements, setAgreements] = useState({  // 개별 약관 동의
        termsAgreed : false,
        financeAgreed : false,
        personalInfoAgreed : false,
        provisionAgreed : false,
        smsAgreed : false
    })

    // 비밀번호 유효성 검사 및 확인용
    const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
    const [passwordConfirmMessage, setPasswordConfirmMessage] = React.useState("");

    const handlePassword = (e) => {
        const currentPwConfirm = e.target.value;

        setPasswordConfirm(currentPwConfirm);   // 입력값 저장

        setIsPasswordConfirm((prevIsPasswordConfirm) => {
            const isMatch = password === currentPwConfirm;
            setPasswordConfirmMessage(isMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.');
            console.log(isMatch)
            return isMatch;
        });
    }

    //------------- 약관 동의 체크 상태 변경 함수 --------------
    // 1. 전체체크 활성화
    const handleAgreement = (e) =>{
        const {name, checked} = e.target;   //name과 checked 속성을 기반으로 상태 업데이트

        setAgreements((prevAgreements) => ({...prevAgreements, [name]: checked}));
        //전체 동의 시 모든 항목에 체크
        const allChecked = Object.values({...agreements, [name]: checked}).every(
            (value) => value === true
        );
        setAllAgreed(allChecked)    //상태 적용
    }
    // 2. 전체 체크 비활성화
    const handleAllAgreement = (e) => {
        const {checked} = e.target; //name과 checked 속성을 기반으로 상태 업데이트

        setAgreements((prevAgreements)=>
            Object.keys(prevAgreements).reduce(
                (newAgreements, agreementKey) => ({
                    ...newAgreements,
                    [agreementKey]: checked,
                }),
                {}
            )
        );
        setAllAgreed(checked);
    }

    //--------------- 회원 가입 버튼 활성화 설정 ---------------
    const isRequiredAgreed = () => {
        // 필수 항목들이 모두 체크되어 있으면 true를 반환
        return agreements.termsAgreed && agreements.financeAgreed && agreements.personalInfoAgreed;
    };

    // 회원가입 버튼 클릭 시 동작하는 함수
    const handleSignup = (event) => {
        // 버튼만 누르면 리로드 되는것을 막아줌
        event.preventDefault();

        if (!isRequiredAgreed()) {
            //case1 : 필수 항목 동의가 안 됨
            alert('필수 항목에 동의해주세요.');
            return false;
        } else if (!isPasswordConfirm) {
            // Case 2: 비밀번호 불일치
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            // Case 3: 필수 동의, 비밀번호 일치
            alert('회원가입 성공!');
            navigate('/login'); // 로그인 화면으로 이동
            return true;
        }
    };

    //-----------------휴대폰 번호 입력 함수------------------
    const handlePhone = (e) => {
        const value = phoneRef.current.value.replace(/\D+/g, "");
        const numberLength = 11;
        let result;
        result = "";
        //자동으로 000-0000-0000 형식으로 만들어준다
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
        setPhone(e.target.value);
    };



    const SignUpButton = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('http://43.202.247.199:8080/auth/signup', sign).then(response => {
            navigate("/Login");
            });
        } catch (err) {
            console.log(err);
        }

    }
    const [sign, setSign] = useState(
        {
            name: "",
            loginId: "a@ac.kr",
            loginPassword: "",
            authority:"ROLE_USER",
            nickname: "",
            phoneNumber: "",
            introduce: "",
            techList: [
                "java"
            ]
        }

    )

    //stack get
    useEffect(() => {
        const techList = async () => {
            try {
                const res = await axios.get('http://43.202.247.199:8080/tech-list' , {
                    headers: {
                        Accept: "application/json"
                    }
                });
                setTechList(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        techList();
    }, []);

    // const emailChange = (e) =>{
    //         const selectedValue = e.target.value + "@gmail.com"; // 선택한 옵션의 값
    //         setSelectedOption(selectedValue); // 선택한 옵션 값을 상태에 저장
    //         sign.loginId = e.target.value;
    //         console.log("email : " + sign.loginId)
    // }

    const pwChange = (e) =>{
        const selectedValue = e.target.value; // 선택한 옵션의 값
        setSelectedOption(selectedValue); // 선택한 옵션 값을 상태에 저장
        sign.loginPassword = e.target.value;
    }

    const pwCheckChange = (e) => {
        setLoginPasswordCheck(e.target.value);
        console.log("email : " + sign.loginId);
        //비밀번호 체크
        if(sign.loginPassword !== loginPasswordCheck){

        }
    }

    // const phoneChange = (e) =>{
    //     const selectedValue = e.target.value; // 선택한 옵션의 값
    //     setSelectedOption(selectedValue); // 선택한 옵션 값을 상태에 저장
    //     sign.phoneNumber = e.target.value;
    // }

    const nameChange = (e) =>{
        const selectedValue = e.target.value; // 선택한 옵션의 값
        setSelectedOption(selectedValue); // 선택한 옵션 값을 상태에 저장
        sign.name = e.target.value;
    }

    const nicknameChange = (e) =>{
        const selectedValue = e.target.value; // 선택한 옵션의 값
        setSelectedOption(selectedValue); // 선택한 옵션 값을 상태에 저장
        sign.nickname = e.target.value;
    }

    const stackChange = (e) =>{
        const selectedValue = e.target.value; // 선택한 옵션의 값
        setSelectedOption(selectedValue); // 선택한 옵션 값을 상태에 저장
        sign.techList[0].push(e.target.value);
    }

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
    const phoneChange = (e) => {
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

        const selectedValue = e.target.value; // 선택한 옵션의 값
        setSelectedOption(selectedValue); // 선택한 옵션 값을 상태에 저장
        sign.phoneNumber = e.target.value;
    };

    //스택 선택시 배열에 담기
    const [items, setItems] = useState([]); // 배열 상태 초기화

    return (
        <div>
            {Header()}
            <main>
                <div className='signup_main'>
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}> 회원가입 </span>
                    <div className='signup_txt-line'/> {/*회원가입 아래 줄*/}

                    <form className='signup_form'>
                        <div className='signup_form_input-block'>
                            <label htmlFor='email' className='signup_form_label'>이메일</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox' id='signup_email'>
                                <input id='signup_form_email_txt'
                                    type='text'
                                    placeholder='Email'
                                    // onChange={emailChange}
                                />
                                <p style={{width:'20px'}}>@</p>
                                {/* <input style={{width:'95px', margin: '0 5px 0 10px'}}
                                    type='text'
                                /> */}
                                <select class="box" id="signup_domain-list">
                                    <option value="type">직접 입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="google.com">google.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="hanmail.net">hanmail.net</option>
                                    <option value="yahoo.com">yahoo.com</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="kakao.com">kakao.com</option>
                                </select>
                            </div>
                        </div>

                        <div className='signup_form_input-block'>
                            <label htmlFor='password' className='signup_form_label'>비밀번호</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    onChange={pwChange}
                                />
                            </div>
                        </div>

                        <div className='signup_form_input-block'>
                            <label htmlFor='password' className='signup_form_label'>비밀번호 확인</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    onChange={pwCheckChange}
                                />
                            </div>
                        </div>
                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>휴대폰</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input
                                    type='tel'
                                    value={num}  ref={phoneRef}
                                    placeholder='Phone Number'
                                    onChange={phoneChange}
                                />
                            </div>
                        </div>

                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>이름</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    onChange={nameChange}
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
                                    onChange={nicknameChange}
                                />
                            </div>
                        </div>
                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>본인파트</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                {techList.map(item => {
                                    if (item.type === 'ROLE') {
                                        return (
                                            <p className='signup_form_part' onClick={toggleBold} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#{item.name}</p>
                                        );
                                    } else {
                                        // 조건을 충족하지 않는 경우 아무것도 렌더링하지 않음
                                        return null;
                                    }
                                })}
                                {/*<p className='signup_form_part' onClick={toggleBold1} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#iOS</p>*/}
                                {/*<p className='signup_form_part' onClick={toggleBold2} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#Android</p>*/}
                                {/*<p className='signup_form_part' onClick={toggleBold3} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#Web</p>*/}
                            </div>
                        </div>
                        <div className='signup_form_input-block'>
                            <p style={{ display: 'inline-block', textAlign: 'right', width: '87px', marginLeft: '15px'}}></p>
                            <div className='signup_form_input-whiteBox'>
                                <p className='signup_form_part'>#Plan</p>
                                <p className='signup_form_part'>#Design</p>
                                <p className='signup_form_part'>#Front-End</p>
                                <p className='signup_form_part'>#Back-End</p>
                            </div>
                        </div>

                        <button onClick={SignUpButton}>회원가입</button>

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

export default SignUp;