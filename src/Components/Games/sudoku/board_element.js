import "../../../Styles/sudoku.css";

const Board_creation = (props) => {
  return (
    <>
      {props.element > 0 ? (
        <div
          className="item"
          onClick={() => {
            props.setSelectedBox(props.position);
          }}
        >
          {props.element}
        </div>
      ) : (
        <div
          className="item_blank"
          onClick={() => {
            props.setSelectedBox(props.position);
          }}
        >
          {props.element}
        </div>
      )}
    </>
  );
};

export default Board_creation;
