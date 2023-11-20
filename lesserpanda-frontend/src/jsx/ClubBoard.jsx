import backgroundImage from '../logo.svg'

export function ClubBoard() {
    return (
        <div className="clubboard" style={{width:'200px', height:'200px', alignItems:'center', justifyItems:'center',display:'flex',flexDirection:'column'}}>

            <div className="image" style={{width:'100px',height:'100px',backgroundSize:"cover",backgroundPosition:'center',backgroundImage: `url(${backgroundImage})`
            }}>
            </div>

            <div style={{display:'flex', flexDirection:'row', justifyItems:'center',alignItems:'center'}}>
                <p>동아리 이름</p>
                <h6 style={{marginLeft:'5px'}}>stack</h6>
            </div>

            <div>
                <p>동아리 설명</p>
            </div>
        </div>
    );
}
