const ShowBtn = (props) => {
  const { toToggleShowButton, isAnimating } = props;
  let show = 'Открыть'
  let hide = 'Скрыть'
  const changeName = () => {
    show = hide
  }
  return (
    <div className={`show-button ${isAnimating ? 'fade-in'  :  'fade-out'}`}>
      <button
      onClick={() => toToggleShowButton()}
      
      ><b>{show}</b></button>
    </div>
  );
};

export default ShowBtn;