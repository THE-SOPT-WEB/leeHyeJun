import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { client } from "../../lib/api";
import { useRef } from "react";

const postInfoList = [
  {
    label: "이름",
    id: "name",
    placeholder: "이름이 뭐예요?",
  },
  {
    label: "내용",
    id: "content",
    placeholder: "무슨 내용의 편지를 써볼까요?",
  },
  {
    label: "비밀번호",
    id: "password",
    placeholder: "비밀번호를 통해 편지를 잠궈요.",
    type: "password",
  },
  {
    label: "비밀번호 힌트",
    id: "hint",
    placeholder: "비밀번호 힌트를 주세요.",
  },
];

function WriteForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await client.post("/letter", formData);
    navigate("/");
  };

  return (
    <WriteFormWrapper>
      <PostForm onSubmit={handleSubmit}>
        {postInfoList.map(({ label, id, placeholder, type }) => (
          <InputWrapper key={id}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <input
              type={type || "text"}
              placeholder={placeholder}
              id={id}
              name={id}
            />
          </InputWrapper>
        ))}
        <InputLabel htmlFor="images">썸네일</InputLabel>
        <FileUploadButton
          onClick={(e) => {
            e.preventDefault();
            fileInputRef?.current.click();
          }}
        >
          이미지 업로드 (jpg, jpeg, png)
        </FileUploadButton>
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg"
          id="thumbnails"
          name="images"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
        ></input>
        <SubmitButton type="submit">비밀편지 보내기</SubmitButton>
      </PostForm>
    </WriteFormWrapper>
  );
}

export default WriteForm;

const WriteFormWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 450px;
  padding: 30px 0px;
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

const InputLabel = styled.label`
  padding: 8px;

  font-size: 25px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.font.title};
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

const FileUploadButton = styled(SubmitButton)`
  width: 350px;
  height: 35px;

  margin: 0;
  margin-bottom: 20px;
  background-color: #e8f0fe;

  font-size: 20px;
  color: black;
`;
