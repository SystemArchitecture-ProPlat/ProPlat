import React, {useState, useRef, useEffect} from 'react';
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import Pagination from "./Pagination";

const cellStyle = {
    // width:'200px',
    // height:'300px',
    flex:'1',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex',
};

const cellStyle2 = {
    // width:'200px',
    // height:'300px',
    flex:'1',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex',
};

const rowStyle = {
    width:'600px',
    display: 'flex',
    marginTop:'10px',
    borderBottom: '1px solid #ccc', // 행 구분선 스타일 설정
    flexDirection:'column',
};

function ProjectContent(){
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [isBold, setIsBold] = useState(false);
    const [num, setNum] = useState('');
    const phoneRef = useRef();
    const [postReply, setPostReply] = useState({
        content:null
    });
    const [replyList, setReplyList] = useState([]);
    const jwtToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const [replyItem, setReplyItem] = useState([]);
    const [selectId, setSelectId] = useState(null);
    const [items, setItems] = useState([]); // 배열 상태 초기화


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

    const replyToggle = (e) => {
        // setSelectId((prevId) => (prevId === e.target.id ? null : e.target.id));
        if (replyItem.includes(e.target.id)) {
            // 아이템이 이미 배열에 있는 경우 제거
            console.log("yes");
            const updatedItems = replyItem.filter(item => item !== e.target.id);
            setReplyItem(updatedItems);
            setSelectId(e.target.id);
            console.log(e.target.id);
            console.log(replyItem);

        } else {
            console.log("no");
            // 아이템이 배열에 없는 경우 추가
            setReplyItem([...replyItem, e.target.id]);
            setSelectId(e.target.id);
            console.log(e.target.id);
            console.log(replyItem);

        }

    };

    const reply = (e) => {
        postReply.content = (e.target.value);
        console.log("content : " + postReply.content);
    }

    const save = () => {
        const saveReply = async (id) => {

            axios.post(`http://43.202.247.199:8080/postId=${id}/reply-save`, postReply, {headers: {
                    // "Content-Type" : 'application/json',
                    Authorization : `Bearer ${jwtToken}`,
                }, withCredentials: true})
                .then(response => {
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        saveReply(id);
    }

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

    useEffect(() => {
        const profileInfo = async (id) => {

            axios.get(`http://43.202.247.199:8080/post/postId=${id}`)

                .then(response => {
                    setPosts(response.data);
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        profileInfo(id);
    }, []);

    useEffect(() => {
        const replyList = async (id) => {

            axios.get(`http://43.202.247.199:8080/postId=${id}/reply-list`)

                .then(response => {
                    setReplyList(response.data.content);
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        replyList(id);
    }, []);

    const rereply = (e) => {
        navigate('/ProjectContentReReply/' + id + '/'+e.target.id);
    }

    return (
        <div>
            {Header()}
            <main>
                <div className='signup_main2'>
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}> 모집글 보기 </span>
                    <div className='signup_txt-line'/> {/*회원가입 아래 줄*/}

                    <form className='signup_form'>

                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>본인파트</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <p className='signup_form_part' onClick={toggleBold} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#iOS</p>
                                <p className='signup_form_part' onClick={toggleBold} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#Android</p>
                                <p className='signup_form_part' onClick={toggleBold} style={{cursor:'pointer', fontWeight: isBold ? 'bold' : 'normal', color: isBold ? '#000000' : '#bababa'}}>#Web</p>
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

                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>제목</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <text
                                    type='tel'
                                >{posts.title}</text>
                            </div>
                        </div>

                        <div className='signup_form_input-blockIntro'>
                            <label className='signup_form_label'>내용</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBoxIntro'>
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <text
                                        style={{width:'350px'}}
                                    >{posts.content}</text>
                                </div>
                            </div>
                        </div>

                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>이미지</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <text
                                    type='tel'
                                >이미지</text>
                            </div>
                        </div>

                        <div className='signup_white-line'></div> {/*흰색 줄*/}

                        <p>댓글</p>
                        <div style={rowStyle}>
                            {
                                replyList.slice(offset, offset + limit).map(({replyId,username,content,replyingTime, child_replies}) => {
                                const stringReply = replyId.toString();
                                if(replyItem.includes(stringReply))
                                {
                                    return <div>
                                        <div style={{flexDirection:'column', display:'flex'}}>
                                            <div style={cellStyle}>
                                                <p style={{marginTop:'10px', marginRight:'20px'}}>{username}</p>
                                                <p onClick={rereply} style={{marginTop:'10px',marginRight:'20px'}}>{content}</p>
                                                <p style={{marginTop:'10px', marginLeft:'20px'}}>{replyingTime}</p>
                                                <p id={replyId} onClick={replyToggle}>댓글 보기/닫기</p>
                                            </div>


                                            {child_replies.map(item => {
                                                return <div>
                                                    <div style={{flexDirection:'column', display:'flex', alignItems:'center',justifyContent:'center'}}>
                                                        <div style={{cellStyle2}}>
                                                            <div style={{flexDirection:'row', display:'flex'}}>
                                                                <p style={{marginTop:'10px', marginRight:'20px'}}>{item.username}</p>
                                                                <p style={{marginTop:'10px',marginRight:'20px'}}>{item.content}</p>
                                                                <p style={{marginTop:'10px', marginLeft:'20px'}}>{item.rereplyingTime}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                }
                                else
                                {
                                    return <div>
                                        <div style={{flexDirection:'column', display:'flex'}}>
                                            <div style={cellStyle}>
                                                <p style={{marginTop:'10px', marginRight:'20px'}}>{username}</p>
                                                <p onClick={rereply} style={{marginTop:'10px',marginRight:'20px'}}>{content}</p>
                                                <p style={{marginTop:'10px', marginLeft:'20px'}}>{replyingTime}</p>
                                                <p id={replyId} onClick={replyToggle}>댓글 보기/닫기</p>
                                            </div>


                                            {child_replies.map(item => {
                                                return <div style={{display:'none'}}>
                                                    <div style={{flexDirection:'column', display:'flex', alignItems:'center',justifyContent:'center'}}>
                                                        <div style={{cellStyle2}}>
                                                            <div style={{flexDirection:'row', display:'flex'}}>
                                                                <p style={{marginTop:'10px', marginRight:'20px'}}>{item.username}</p>
                                                                <p style={{marginTop:'10px',marginRight:'20px'}}>{item.content}</p>
                                                                <p style={{marginTop:'10px', marginLeft:'20px'}}>{item.rereplyingTime}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                }
                            })}
                        </div>

                        <div className='signup_white-line'></div> {/*흰색 줄*/}

                        <p>댓글 입력</p>
                        <input onChange={reply}/>
                        <button onClick={save}>저장</button>
                    </form>

                    <footer>
                        <Pagination
                            total={replyList.length}
                            limit={limit}
                            page={page}
                            setPage={setPage}
                        />
                    </footer>
                </div>
            </main>
            {banner()}
        </div>
    );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

export default ProjectContent;