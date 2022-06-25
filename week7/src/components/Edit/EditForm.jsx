import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../lib/api";
import { ReactComponent as LikeIcon } from "../../assets/message-mail.svg";
import PostForm from "../common/PostForm";

function EditForm({ postId }) {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);

      const { data } = await client.patch(`/letter/${postId}`);
      setPost(data.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patchObject = new Object();

    const formData = new FormData(e.target);
    for (let pair of formData.entries()) {
      patchObject[pair[0]] = pair[1];
    }
    await client.patch(`/letter/${postId}`, patchObject);
    navigate("/");
  };

  if (loading)
    return (
      <Loader>
        <LikeIcon />
      </Loader>
    );
  if (!post) return null;

  return (
    <EditFormWrapper>
      <PostForm onSubmit={handleSubmit} post={post}>
        <SubmitButton type="submit">몰래 수정하기</SubmitButton>
      </PostForm>
    </EditFormWrapper>
  );
}

export default EditForm;

const EditFormWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 450px;
  padding: 30px 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.lightpurple};
`;

const SubmitButton = styled.button`
  width: 200px;
  height: 50px;

  margin: 20px 0;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.purple};

  color: white;
  font-size: 25px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.font.title};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Loader = styled.i`
  width: 30px;
  height: 30px;

  animation: translate infinite 0.4s;

  @keyframes translate {
    0% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;
