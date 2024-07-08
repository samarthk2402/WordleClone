function Character({ char, type }) {
  return (
    <div className={"character " + type}>
      <span className="text">{char.toUpperCase()}</span>
    </div>
  );
}

export default Character;
