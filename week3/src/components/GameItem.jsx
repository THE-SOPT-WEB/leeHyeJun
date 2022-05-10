import styled from "styled-components";

function GameItem(props) {
  const { gameInfo, handleClick } = props;

  return (
    <Item>
      <Image
        src={gameInfo.img}
        alt={gameInfo.name}
        onClick={() => {
          handleClick(gameInfo);
        }}
      />
      <div>{gameInfo.name}</div>
    </Item>
  );
}

export default GameItem;

const Item = styled.div`
  position: relative;
  margin: 4rem 5rem;

  & > div {
    position: absolute;
    left: 50%;
    top: 90%;
    transform: translate(-50%, -50%);

    font-size: 3rem;
    font-weight: bold;
    color: #ffdf43;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
`;

const Image = styled.img`
  width: 30rem;
  height: 30rem;
  border-radius: 15px;

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
