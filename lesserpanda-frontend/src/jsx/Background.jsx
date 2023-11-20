import React from 'react';
import '../css/App.css' // CSS 파일을 가져옵니다.

function Background() {
    return (
        <div className="container">
            <div className="background-image"></div>
            <div className="text-overlay">
                <h1>Your Text Here</h1>
            </div>
        </div>
    );
}

export default Background;
