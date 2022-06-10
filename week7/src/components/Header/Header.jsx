import styled from "styled-components";
import icon from "../../assets/web_icon.png";

function Header() {
  return (
    <HeaderWrapper>
      <img src={icon} alt="웹 아이콘" />
      <h1>웹파트 우체통</h1>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  padding: 30px;
  background-color: ${({ theme }) => theme.color.ghostwhite};

  img {
    width: 40px;
  }

  h1 {
    font-family: ${({ theme }) => theme.font.title};
    font-size: 40px;
    color: ${({ theme }) => theme.color.purple};
  }
`;
