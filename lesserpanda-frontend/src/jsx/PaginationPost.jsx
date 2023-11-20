import { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import axios from "axios";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

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

    return (
        <Layout>
            <header>
                <h1>게시물 목록</h1>
            </header>


            <main>
                {posts.slice(offset, offset + limit).map(({postId,title,content}) => (
                    <article key={postId}>
                        <h3>
                            {title}
                        </h3>
                        <p>{content}</p>
                    </article>
                ))}
            </main>

            <footer>
                <Pagination
                    total={posts.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </footer>
        </Layout>
    );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

export default Posts;