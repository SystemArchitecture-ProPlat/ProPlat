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
    display:'flex'
};

const rowStyle = {
    width:'600px',
    display: 'flex',
    marginTop:'10px',
    borderBottom: '1px solid #ccc', // 행 구분선 스타일 설정
    flexDirection:'column',
};

function ProjectContentReReply(){
    const {id, reply} = useParams();
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

    //스택 선택시 배열에 담기
    const [items, setItems] = useState([]); // 배열 상태 초기화

    const replyToggle = (e) => {
        if (items.includes(e.target.textContent)) {
            // 아이템이 이미 배열에 있는 경우 제거
            const updatedItems = items.filter(item => item !== e.target.textContent);
            setItems(updatedItems);
        } else {
            // 아이템이 배열에 없는 경우 추가
            setItems([...items, e.target.textContent]);
        }
    }

    useEffect(() => {
        const profileInfo = async (id) => {

            axios.get(`http://43.202.247.199:8080/postId=${id}/reply-list`)

                .then(response => {
                    setPosts(response.data.content);
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

    return (
        <div>
            {Header()}
            <main>
                <div className='signup_main'>
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}> 모집글 보기 </span>
                    <div className='signup_txt-line'/> {/*회원가입 아래 줄*/}



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

export default ProjectContentReReply;