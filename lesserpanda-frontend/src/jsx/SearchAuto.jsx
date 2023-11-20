import {Header} from './Header';
import {banner} from './Banner';
import React, {useState} from 'react';
import {Card, Input} from "semantic-ui-react";


const cellStyle = {
    width:'600px',
    height:'150px',
    // flex:'1',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
};

const tableStyle = {
    marginTop:'20px',
    minHeight:'80dvh',
    align:'center',
    alignItems: 'center',
    // justifyContent:"center",
    display: 'flex',
    flexDirection: 'column',
    height:'1000px',
    width: '800px', // 테이블 전체 너비 설정 (원하는 값으로 조정)
    // height:'50px',
    border: '1px solid #ccc', // 테두리 스타일 설정
    background:'gray'
};

function ProjectMain() {

    const [APIData, setAPIData] = useState(
        [{
            name: "kim",
            email:"a"
        },
        {
            name:"mindfsdf",
            email:"b"
        },
        {
            name:"min  dfsd",
            email:"b"
        },
        {
            name:"min",
            email:"b"
        },
        {
            name:"sung",
            email:"c"
        },
        ]
    )
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    // useEffect(() => {
    //     axios.get(`https://jsonplaceholder.typicode.com/users`)
    //         .then((response) => {
    //             setAPIData(response.data);
    //         })
    // }, [])`
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    // 검색어 업데이트 핸들러
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 검색 버튼 클릭 핸들러
    const handleSearchClick = () => {
        alert(`검색어: ${searchTerm}`);
        // 실제 검색 동작을 수행하거나 다른 작업을 수행할 수 있습니다.
    };

    return (
        <div style={{minHeight:'100dvh'}}>
            {Header()}

            <div className="search" style={{flexDirection:'row' ,height:'100px', display:'flex', background:'gray',justifyContent:'center',alignItems:'center'}}>

                <div style={{display:'flex', flexDirection:'column'}}>
                    <div >
                        <input
                            type="text"
                            placeholder="검색어 입력"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Input icon='search'
                               placeholder='SearchAuto...'
                               onChange={(e) => searchItems(e.target.value)}/>
                        <button onClick={handleSearchClick}>검색</button>
                    </div>
                    <div className="cate" style={{flexDirection:'row',display:'flex', marginTop:'10px'}}>
                        <p style={{marginLeft:'10px'}}>전체</p>
                        <p style={{marginLeft:'10px'}}>모집중</p>
                        <p style={{marginLeft:'10px'}}>모집완료</p>
                    </div>
                </div>
                <div>
                    <a href="/Collect"><p>글 작성</p></a>
                </div>
            </div>


            <div className = "test1" style={{flex:'1',minHeight:'100dvh',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>

                <div className="test2" style={tableStyle}>
                    <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                        {searchInput.length > 1 ? (
                            filteredResults.map((item) => {
                                return (
                                    <div style={cellStyle}>
                                        <div style={{flexDirection:'column', display:'flex'}}>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            APIData.map((item) => {
                                return(
                                    <div style={cellStyle}>
                                        <div style={{flexDirection:'column', display:'flex'}}>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </Card.Group>

                    {/*{APIData.map((item) => {*/}
                    {/*    return(*/}
                    {/*        <div style={cellStyle}>*/}
                    {/*            <div style={{flexDirection:'column', display:'flex'}}>*/}
                    {/*                <p>{item.name}</p>*/}
                    {/*                <p>{item.email}</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*            );*/}
                    {/*})}*/}

                    {/*<div style={cellStyle}>*/}
                    {/*    <div style={{flexDirection:'row', display:'flex'}}>*/}
                    {/*        <p style={{marginRight:'10px'}}>모집중</p>*/}
                    {/*        <p>제목</p>*/}
                    {/*    </div>*/}

                    {/*    <p style={{marginTop:'10px'}}>내용</p>*/}
                    {/*    <p style={{marginTop:'10px'}}>stack</p>*/}
                    {/*    <p style={{marginTop:'10px'}}>작성일지</p>*/}
                    {/*</div>*/}
                    {/*<div style={cellStyle}>셀 1-2</div>*/}
                    {/*<div style={cellStyle}>셀 1-3</div>*/}

                    {/*<div style={cellStyle}>셀 2-1</div>*/}
                    {/*<div style={cellStyle}>셀 2-2</div>*/}
                    {/*<div style={cellStyle}>셀 2-3</div>*/}

                </div>

            </div>

            {banner()}
        </div>
    );
}

export default ProjectMain;