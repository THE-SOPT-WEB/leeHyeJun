import { Link } from "react-router-dom";
import styled from "styled-components";
import icon from "../../assets/web_icon.png";

function Header() {
  return (
    <HeaderWrapper>
      <HeaderTitle>
        <img src={icon} alt="웹 아이콘" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>웹파트 우체통</h1>
        </Link>
      </HeaderTitle>
      <Link to="/write">
        <button type="button">편지 쓰러가기</button>
      </Link>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  padding: 30px;
  background-color: ${({ theme }) => theme.color.ghostwhite};

  button {
    position: absolute;
    right: 30px;

    padding: 5px;
    border-radius: 5px;
    border: none;
    background-color: ${({ theme }) => theme.color.lightpurple};

    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;

  img {
    width: 40px;
  }

  h1 {
    font-family: ${({ theme }) => theme.font.title};
    font-size: 40px;
    color: ${({ theme }) => theme.color.purple};
  }
`;
