import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Pageable() {
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const postsPerPage = 3; // 한 페이지당 표시될 게시물 수

    useEffect(() => {
        // 서버에서 데이터 가져오기 (예: Axios 사용)
        axios.get('http://43.202.247.199:8080/post/list')
            .then(response => {
                setPosts(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행

    const pageCount = Math.ceil(posts.length / postsPerPage);

    const changePage = ({ selected }) => {
        console.log("length : " +posts.length);
        console.log("pageCount : " + pageCount);
        setPageNumber(selected);
    };

    const displayPosts = posts
        .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
        .map(post => (
            <div key={post.postId}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {/* 여기에 다른 게시물 정보를 표시할 수 있습니다 */}
            </div>
        ));

    return (
        <div>
            <p>he</p>
            {displayPosts}
            <ReactPaginate
                previous={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
            />
        </div>
    );
}

export default Pageable;
