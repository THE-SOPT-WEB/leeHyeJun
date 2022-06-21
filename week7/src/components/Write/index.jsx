import styled from "styled-components";
import WriteForm from "./WriteForm";

function WritePage() {
  return (
    <WriteWrapper>
      <WriteForm />
    </WriteWrapper>
  );
}

export default WritePage;

const WriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;
