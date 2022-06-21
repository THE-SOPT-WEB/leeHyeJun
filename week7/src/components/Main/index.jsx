import { useState, useEffect } from "react";
import { client } from "../../lib/api";
import styled from "styled-components";
import PostBox from "./PostBox";

function MainPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await client.get("/letter");
      setPosts(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <MainWrapper>
      <PostBox postList={posts} />
    </MainWrapper>
  );
}

export default MainPage;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
