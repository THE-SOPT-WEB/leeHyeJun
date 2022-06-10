import Post from "./Post";
import styled from "styled-components";

function PostBox({ postList }) {
  return (
    <PostBoxWrapper>
      {postList.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </PostBoxWrapper>
  );
}

export default PostBox;

const PostBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  justify-items: center;
`;
