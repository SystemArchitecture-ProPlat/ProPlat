import {Header} from './Header';
import {banner} from './Banner';
import React from 'react';
import {useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../css/SignUp.css';
import Pagination from "./Pagination";
import styled from "styled-components";


const cellStyle = {
    width:'600px',
    // height:'150px',
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

function ClubMain() {

    const navigate = useNavigate();

    const [club, setClub] = useState([]);
    const [clubInfo, setClubInfo] = useState([]); //content
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    const imageurl = '../images/ogu.jpg';

    useEffect(() => {
        const clubInfo = async () => {
            try {
                const res = await axios.get('http://43.202.247.199:8080/main' , {
                    headers: {
                        Accept: "application/json"
                    }
                });
                setClub(res.data);
                setClubInfo(res.data.content);
            } catch (err) {
                console.log(err);
            }
        };
        clubInfo();
    }, []);

    return (

        <div>
            <main>
                <Layout>
                    {Header()}
                    <main>
                        <div className='signup_main' style={{justifyContent:'center',alignItems:'center'}}>

                            <span style={{fontSize: '20px', fontWeight: 'bold'}}> 동아리 목록 </span>


                            <div className='signup_txt-lineProjectMain'/> {/*회원가입 아래 줄*/}

                            <div style={{flex:'1',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
                                <div className="test2" style={tableStyle}>
                                    {clubInfo.slice(offset, offset + limit).map(({title, content}) => {
                                            return <article style={cellStyle}>
                                                <div style={{flexDirection:'row', display:'flex'}}>
                                                    <p style={{flex:'3', borderRadius: '20px', border: '1px solid #ccc'}}>{title}</p>
                                                </div>
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <img src='../images/ogu.jpg' alt='' style={{height:'100px', width:'100px'}}/>
                                                    <div style={{display:'flex', flexDirection:'column'}}>
                                                        <p style={{marginTop:'10px'}}>{title}</p>
                                                        <p style={{marginTop:'10px'}}>{content}</p>
                                                    </div>
                                                </div>
                                            </article>
                                    })}
                                </div>
                            </div>
                            <footer>
                                <Pagination
                                    total={clubInfo.length}
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

        // <div>
        //     {Header()}
        //
        //     <div className = "test1" style={{flex:'1',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
        //
        //         <div className="test2" style={tableStyle}>
        //             <div style={rowStyle}>
        //                 {(clubInfo).map(item => {
        //                     return (
        //                         <div style={cellStyle}>
        //                             <div style={{display:'flex', alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
        //
        //                                 <img src='../images/ogu.jpg' alt='' style={{height:'100px', width:'100px'}}/>
        //
        //                                 <div style={{borderRadius:'10px', border: '1px solid #ccc', marginTop:'10px', paddingLeft:'10px', paddingRight:'10px'}}>
        //                                     <p >{item.name}</p>
        //                                 </div>
        //
        //                                 <div style={{borderRadius:'10px', border: '1px solid #ccc', marginTop:'10px', paddingLeft:'10px', paddingRight:'10px'}}>
        //                                     <p>{item.content}</p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     );
        //                 })}
        //
        //                 <div style={cellStyle}>셀 1-3</div>
        //             </div>
        //
        //             {/* 테이블 행 2 */}
        //             <div style={rowStyle}>
        //                 <div style={cellStyle}>셀 2-1</div>
        //                 <div style={cellStyle}>셀 2-2</div>
        //                 <div style={cellStyle}>셀 2-3</div>
        //             </div>
        //
        //             {/* 테이블 행 3 */}
        //             <div style={rowStyle}>
        //                 <div style={cellStyle}>셀 3-1</div>
        //                 <div style={cellStyle}>셀 3-2</div>
        //                 <div style={cellStyle}>셀 3-3</div>
        //             </div>
        //
        //             <footer>
        //                 <Pagination
        //                     total={clubInfo.length}
        //                     limit={limit}
        //                     page={page}
        //                     setPage={setPage}
        //                 />
        //             </footer>
        //         </div>
        //     </div>
        //
        //     {banner()}
        // </div>
    );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;
export default ClubMain;
