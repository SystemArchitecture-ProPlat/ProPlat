import {Header} from './Header';
import {banner} from './Banner';
import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import '../css/Modal.css'
import {TextArea} from "semantic-ui-react";

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
const cellStyle2 = {
    // width:'200px',
    // height:'300px',
    flex:'2',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
};

const cellStyle3 = {
    // width:'200px',
    // height:'300px',
    display:'flex',
    flexDirection:'row',
    flex:'3',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
};


const tableStyle = {
    marginTop:'20px',
    align:'center',
    alignItems: 'center', justifyContent:"center",
    display: 'flex',
    flexDirection: 'column',
    // width: '800px', // 테이블 전체 너비 설정 (원하는 값으로 조정)
    // height:'50px',
    border: '1px solid #ccc', // 테두리 스타일 설정
    background:'gray'
};

const rowStyle = {
    width:'600px',
    display: 'flex',
    marginTop:'10px',
    borderBottom: '1px solid #ccc', // 행 구분선 스타일 설정
};



function ProfileBefore() {



    const [text, setText] = useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

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

    //체크박스 추가
    const [checkboxes, setCheckboxes] = useState([]);

    // const handleButtonClick = () => {
    //     const newCheckboxes = [...checkboxes];
    //     newCheckboxes.push(checkboxes.length + 1); // 고유한 키를 위해 길이를 사용
    //     setCheckboxes(newCheckboxes);
    // };

    //체크박스 선택
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    //버튼 클릭시 텍스트 연결
    const [buttonTexts, setButtonTexts] = useState([]); // 버튼 텍스트를 저장하는 배열

    const handleButtonClick = (text) => {
        // 이전 버튼 텍스트와 새로운 텍스트를 합쳐 새 배열 생성
        const newButtonTexts = [...buttonTexts, text];
        setButtonTexts(newButtonTexts); // 버튼 텍스트 배열을 업데이트
    };


    return (
        <div>
            {Header()}

            <div className="search" style={{flexDirection:'column' ,height:'100px', display:'flex', background:'gray',justifyContent:'center',alignItems:'center'}}>

            </div>

            <div className = "test1" style={{flexDirection:'column',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
                <div className="test2" style={tableStyle}>
                    <div style={rowStyle}>
                        <div style={cellStyle}>
                            <p style={{marginRight:'20px'}}>이름</p>
                        </div>
                        <div style={cellStyle3}>
                        </div>
                    </div>

                    <div style={rowStyle}>
                        <div style={cellStyle}>
                            <p style={{marginRight:'20px'}}>userStack</p>
                        </div>
                        <div style={cellStyle3}>

                        </div>
                    </div>

                    <div style={rowStyle}>
                        <div style={cellStyle}>
                            <p style={{marginRight:'20px'}}>닉네임</p>
                        </div>
                        <div style={cellStyle3}>
                            <text
                                type="text"
                                placeholder="닉네임 입력"
                                defaultValue={searchTerm}
                                onChange={handleSearchChange}
                                style={{height:'40px', border: '1px solid #ccc'}}/>
                        </div>
                    </div>

                    <div style={rowStyle}>
                        <div style={cellStyle}>
                            <p style={{marginRight:'20px'}}>이메일</p>
                        </div>
                        <div style={cellStyle3}>
                            <text
                                type="text"
                                placeholder="내용 입력"
                                defaultValue={searchTerm}
                                onChange={handleSearchChange}
                                style={{height:'40px', border: '1px solid #ccc'}}/>
                        </div>
                    </div>

                    <div style={rowStyle}>
                        <div style={cellStyle}>
                            <p style={{marginRight:'20px'}}>휴대폰</p>
                        </div>
                        <div style={cellStyle3}>
                            <text
                                type="text"
                                placeholder="내용 입력"
                                defaultValue={searchTerm}
                                onChange={handleSearchChange}
                                style={{height:'40px', border: '1px solid #ccc'}}/>
                        </div>
                    </div>

                    <div style={rowStyle}>
                        <div style={cellStyle}>
                            <p style={{marginBottom:'15px'}}>소개</p>
                        </div>
                        <div style={cellStyle3}>
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    placeholder="제목 입력"*/}
                            {/*    defaultValue={searchTerm}*/}
                            {/*    onChange={handleSearchChange}*/}
                            {/*    style={{height:'40px', border: '1px solid #ccc'}}/>*/}
                            <text
                                value={text}
                                onChange={handleTextChange}
                                rows="10" // 행 수를 조정하여 원하는 크기의 입력란을 만들 수 있습니다.
                                style={{ resize: "vertical", width:'300px' }} // 사용자가 크기 조절을 할 수 있게 합니다.
                            />
                        </div>

                    </div>


                    <p>내가 쓴 글</p>
                    <div style={rowStyle}>
                        <div style={cellStyle}>셀 1-1</div>
                        <div style={cellStyle}>셀 1-2</div>
                        <div style={cellStyle}>셀 1-3</div>
                    </div>

                </div>


                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="체크 박스 선택 창"
                    className="modalContainer">
                    <div className='modal'>
                        <div>
                            <h2>체크 박스 선택 창</h2>
                            <p>본인의 기술을 선택하세요</p>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <button onClick={() => handleButtonClick('front')}>front</button>
                                <button onClick={() => handleButtonClick('back')}>back</button>
                                <button onClick={closeModal}>닫기</button>
                            </div>
                        </div>
                    </div>

                </Modal>

                <a href="/ProfileModify"><button style={{marginTop:'20px'}}>수정</button></a>

            </div>
            {banner()}
        </div>
    );
}

export default ProfileBefore;