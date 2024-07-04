function Submit({ onSubmit }) {
  return (
    <div className="submitContainer" onClick={onSubmit}>
      <button className="submit">Submit</button>
    </div>
  );
}

export default Submit;
