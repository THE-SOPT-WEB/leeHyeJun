import { Item } from "../style/style";

function Fighter(props) {
  const { gameInfo, handleClick } = props;
  return (
    <Item>
      <img
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

export default Fighter;
