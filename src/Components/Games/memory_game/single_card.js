import "../../../Styles/memory_game.css";

const single_card = ({ picture, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(picture);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          src={picture.img}
          className="front"
          key={picture.id}
          alt="front card"
        ></img>
        <img
          src="./card-back.JPG"
          alt="back card"
          className="back"
          onClick={handleClick}
        ></img>
      </div>
    </div>
  );
};

export default single_card;
