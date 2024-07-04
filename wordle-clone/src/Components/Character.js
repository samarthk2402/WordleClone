function Character({ char, type }) {
  return <div className={"character " + type}>{char}</div>;
}

export default Character;
