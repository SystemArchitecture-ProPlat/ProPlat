// import React, { useState, useEffect } from 'react';
//
// function Clock() {
//     const [currentTime, setCurrentTime] = useState(new Date());
//
//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setCurrentTime(new Date());
//         }, 1000); // 1초마다 갱신
//
//         return () => {
//             clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 클리어
//         };
//     }, []);
//
//     return (
//         <div>
//             <h2>현재 시간:</h2>
//             <p>{currentTime.toLocaleTimeString()}</p>
//         </div>
//     );
// }
//
// export default Clock;


//시간은 없고 몇일 남았는지만 나오게 하기
import React, { useState, useEffect } from 'react';

function Clock() {
    const targetDate = new Date('2023-10-29T00:00:00'); // 목표 날짜 설정
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            const timeDiff = targetDate - currentDate;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 밀리초(ms)를 일(day)로 변환
            setDaysLeft(days);
        }, 1000); // 1초마다 갱신

        return () => {
            clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 클리어
        };
    }, []);

    return (
        <div>
            <h2>D-day까지 남은 날짜:</h2>
            {daysLeft >= 0 ?
                (<p>D-{daysLeft}</p>):
                (<p>마감</p>)
            }

        </div>
    );
}

export default Clock;
