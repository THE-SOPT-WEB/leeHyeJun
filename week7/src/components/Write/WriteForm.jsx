import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { client } from "../../lib/api";
import { useRef } from "react";
import PostForm from "../common/PostForm";

function WriteForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    await client.post("/letter", formData);
    navigate("/");
  };

  return (
    <WriteFormWrapper>
      <PostForm onSubmit={handleSubmit}>
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
