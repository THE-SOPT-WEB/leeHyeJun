import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../lib/api";
import { ReactComponent as LikeIcon } from "../../assets/message-mail.svg";

const postInfoList = [
  {
    label: "이름",
    id: "name",
  },
  {
    label: "내용",
    id: "content",
  },
  {
    label: "비밀번호",
    id: "password",
    type: "password",
  },
  {
    label: "비밀번호 힌트",
    id: "hint",
  },
];

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

  const inputValue = (ref) => {
    if (ref && post) {
      ref.value = post[ref.name];
    }
  };

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
      <PostForm onSubmit={handleSubmit}>
        {postInfoList.map(({ label, id, placeholder, type }) => (
          <InputWrapper key={id}>
            <label htmlFor={id}>{label}</label>
            <input type={type || "text"} id={id} name={id} ref={inputValue} />
          </InputWrapper>
        ))}
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

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    padding: 8px;

    font-size: 25px;
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.title};
  }

  input {
    width: 350px;
    height: auto;

    margin-bottom: 20px;
    border-radius: 10px;
    border: none;

    text-align: center;
    font-size: 18px;
    font-family: ${({ theme }) => theme.font.content};
  }
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
