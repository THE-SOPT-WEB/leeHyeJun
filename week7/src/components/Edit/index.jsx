import styled from "styled-components";
import EditForm from "./EditForm";
import { useParams } from "react-router-dom";

function EditPage() {
  const { postId } = useParams();

  return (
    <EditWrapper>
      <EditForm postId={postId} />
    </EditWrapper>
  );
}

export default EditPage;

const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
