import styled from "styled-components";
import { useState } from "react";
import lock from "../../assets/lock.png";
import Modal from "./Modal";

function Post({ post }) {
  const [isLocked, setIsLocked] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [modalInfo, setModalInfo] = useState({
    hint: "",
    password: "",
  });

  const openModal = () => {
    setModalInfo({ hint: post.hint, password: post.password });
    setHidden(false);
  };

  return (
    <PostWrapper>
      <Modal
        hidden={hidden}
        hideModal={() => {
          setHidden(true);
        }}
        modalInfo={modalInfo}
      ></Modal>
      {isLocked ? (
        <LockPost onClick={openModal}></LockPost>
      ) : (
        <PostItem>
          <PostImage>
            {post.images?.map((image) => (
              <img src={image} alt="썸네일" />
            ))}
          </PostImage>
          <PostName>
            From. <b>{post.name}</b>
          </PostName>
          <PostContent>{post.content}</PostContent>
        </PostItem>
      )}
    </PostWrapper>
  );
}

export default Post;

const PostWrapper = styled.div`
  width: 350px;
  height: 300px;
  background-color: ${({ theme }) => theme.color.purple};
`;

const LockPost = styled(PostWrapper)`
  background-image: url(${lock});
  background-size: 130px;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  transition: background-size 0.2s ease-in-out;

  &:hover {
    background-size: 140px;
  }
`;

const PostItem = styled(PostWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  padding: 10px;
  width: inherit;
  height: inherit;
  background-color: ${({ theme }) => theme.color.lightpurple};
  font-family: ${({ theme }) => theme.font.content};
`;

const PostImage = styled.div`
  display: flex;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
`;

const PostName = styled.h1`
  font-size: 25px;
  color: white;

  b {
    font-weight: bold;
  }
`;

const PostContent = styled.p`
  font-size: 20px;
  color: white;
  line-height: 25px;
  text-align: center;
`;
