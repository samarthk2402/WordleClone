function Character({ char, type }) {
  return <div className={"character " + type}>{char.toUpperCase()}</div>;
}

export default Character;
