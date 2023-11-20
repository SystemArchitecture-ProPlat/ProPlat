import React, {useState, useRef, useEffect} from 'react';
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import axios from "axios";
import Pagination from "./Pagination";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";



const cellStyle = {
    width:'600px',
    height:'150px',
    // flex:'1',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
    marginTop:'20px',
    marginBottom:'20px'
};

const tableStyle = {
    marginTop:'20px',
    // minHeight:'80dvh',
    align:'center',
    alignItems: 'center',
    // justifyContent:"center",
    display: 'flex',
    flexDirection: 'column',
    // height:'950px',
    width: '800px', // 테이블 전체 너비 설정 (원하는 값으로 조정)
    // height:'50px',
    border: '1px solid #ccc', // 테두리 스타일 설정
    background:'#f0f0ff',
    borderRadius: '20px'
};


function ProjectMain(){

    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const navigate = useNavigate();
    const [items, setItems] = useState([]); // 배열 상태 초기화
    const [isBold, setIsBold] = useState(false);
    const [num, setNum] = useState('');
    const phoneRef = useRef();
    const [info, setInfo] = useState([]);

    useEffect(() => {
        // 서버에서 데이터 가져오기 (예: Axios 사용)
        axios.get('http://43.202.247.199:8080/post/list')
            .then(response => {
                setPosts(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);



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

    useEffect(() => {
        const profileInfo = async () => {

            axios.get('http://43.202.247.199:8080/post/list')
                .then(response => {
                    setInfo(response.data.content);
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        profileInfo();
    }, []);

    const postDetail = (e) => {
        navigate('/ProjectContent/' + e.target.id);
    }

    const writePost = (e) => {
        e.preventDefault();
        navigate('/collect');
    }

    return (
        <div>
            <main>
                <Layout>
                    {Header()}
                    <main>
                        <div className='signup_main' style={{justifyContent:'center',alignItems:'center'}}>
                            <div>
                                <button onClick={writePost} style={{marginLeft:'150px'}}>글쓰기</button>
                            </div>

                            <span style={{fontSize: '20px', fontWeight: 'bold'}}> 게시물 목록 </span>


                            <div className='signup_txt-lineProjectMain'/> {/*회원가입 아래 줄*/}

                            <div style={{flex:'1',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
                                <div className="test2" style={tableStyle}>
                                    {posts.slice(offset, offset + limit).map(({postId,title,content,complete, postingTime}) => {
                                        if(complete === true){
                                            return <article style={cellStyle}>
                                                <div style={{flexDirection:'row', display:'flex'}}>
                                                    <div>
                                                        <p style={{flex:'1', borderRadius: '20px', border: '1px solid #ccc'}}>모집완료</p>
                                                    </div>
                                                    <p onClick={postDetail} id={postId}  style={{flex:'3', borderRadius: '20px', border: '1px solid #ccc'}}>{title}</p>
                                                </div>
                                                <p style={{marginTop:'10px'}}>{content}</p>
                                                <p style={{marginTop:'10px'}}>stack</p>
                                                <p style={{marginTop:'10px'}}>{postingTime}</p>
                                            </article>
                                        }
                                        else{
                                            return <article style={cellStyle}>
                                                <div style={{flexDirection:'row', display:'flex'}}>
                                                    <div>
                                                        <p style={{flex:'1', borderRadius: '20px', border: '1px solid #ccc'}}>모집중</p>
                                                    </div>
                                                    <p onClick={postDetail} id={postId} style={{flex:'3', borderRadius: '20px', border: '1px solid #ccc'}}>{title}</p>
                                                </div>
                                                <p style={{marginTop:'10px'}}>{content}</p>
                                                <p style={{marginTop:'10px'}}>stack</p>
                                                <p style={{marginTop:'10px'}}>{postingTime}</p>
                                            </article>
                                        }
                                    })}
                                </div>
                            </div>
                            <footer>
                                <Pagination
                                    total={posts.length}
                                    limit={limit}
                                    page={page}
                                    setPage={setPage}
                                />
                            </footer>
                        </div>
                    </main>
                </Layout>
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
export default ProjectMain;