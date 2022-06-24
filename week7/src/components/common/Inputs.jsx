import styled from "styled-components";
import PostInfoList from "../../utils/constant";

function Inputs({ post }) {
  const inputValue = (ref) => {
    if (ref && post) {
      ref.value = post[ref.name];
    }
  };

  return (
    <>
      {PostInfoList.map(({ label, id, placeholder, type }) => (
        <InputWrapper key={id}>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <input
            type={type || "text"}
            placeholder={placeholder}
            id={id}
            name={id}
            ref={inputValue}
          />
        </InputWrapper>
      ))}
    </>
  );
}

export default Inputs;

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
