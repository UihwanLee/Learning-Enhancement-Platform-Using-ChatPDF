import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';

const BulletinBoardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const PostListContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const PostTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const PostContent = styled.p`
  font-size: 1rem;
  color: #666;
`;

const PostFormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px; /* 모서리 */
  background-color: #f0f0f0; /* 배경색 */
  text-align: center; /* 내용 가운데 정렬 */
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50; /* 배경색 */
  color: white; /* 글자색 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PostForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Math.random(),
      title,
      content,
      date: new Date().toLocaleDateString(),
      views: 0,
    };
    addPost(newPost);
    setTitle('');
    setContent('');
  };

  return (
    <PostFormContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
          rows={4}
        />
        <SubmitButton type="submit">등록</SubmitButton> {/* 등록 버튼 스타일 적용 */}
      </form>
    </PostFormContainer>
  );
};

const BulletinBoard = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <BulletinBoardContainer>
      <Header />
      <Title>Bulletin Board</Title>
      <PostForm addPost={addPost} />
      <PostListContainer>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#999' }}>등록된 게시글이 없습니다.</div>
        ) : (
          posts.map((post, index) => (
            <PostContainer key={post.id}>
              <PostHeader>
                <div>
                  <span>글번호: {index + 1}</span>
                  <span style={{ marginLeft: '10px' }}>등록일: {post.date}</span>
                </div>
                <span>조회수: {post.views}</span>
              </PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
            </PostContainer>
          ))
        )}
      </PostListContainer>
    </BulletinBoardContainer>
  );
};

export default BulletinBoard;
