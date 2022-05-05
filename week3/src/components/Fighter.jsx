function Fighter(props) {
  const { gameInfo, handleClick } = props;
  return (
    <>
      <img
        src={gameInfo.img}
        alt={gameInfo.name}
        onClick={() => {
          handleClick(gameInfo);
        }}
      />
      <p>{gameInfo.name}</p>
    </>
  );
}

export default Fighter;
