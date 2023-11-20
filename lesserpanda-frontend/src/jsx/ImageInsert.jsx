// import React, { useState } from 'react';
//
// function ImageInsert() {
//     const [image, setImage] = useState(null);
//
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         // 선택한 파일을 상태에 저장합니다.
//         setImage(URL.createObjectURL(file));
//     };
//
//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {image && <img src={image} alt="Uploaded" />}
//         </div>
//     );
// }
//
// export default ImageInsert;


import React, { useState } from 'react';

function App() {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        // 선택한 파일들을 상태에 추가합니다.
        setImages((prevImages) => [...prevImages, ...selectedImages]);
    };

    return (
        <div>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            <div className="image-preview">
                {images.map((image, index) => (
                    <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />
                ))}
            </div>
        </div>
    );
}

export default App;
