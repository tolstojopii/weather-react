const ShowBtn = (props) => {
  const { toToggleShowButton, toggleShowButton } = props;

  return (
    <div className="show-button">
      <button onClick={() => toToggleShowButton()}>Кнопочка</button>
    </div>
  );
};

export default ShowBtn;
