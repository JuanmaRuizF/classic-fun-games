import "../../../Styles/sudoku.css";

const Board_creation = (props) => {
  return (
    <>
      {props.element[0] > 0 ? (
        <>
          {props.element[1] ? (
            <div className="element grid_element item_initial">
              <span>{props.element[0]}</span>
            </div>
          ) : (
            <div
              className="element grid_element non_initial_item"
              onClick={() => {
                props.setSelectedBox(props.position);
              }}
            >
              <span>{props.element[0]}</span>
            </div>
          )}
        </>
      ) : (
        <div
          className="element grid_element item_blank"
          onClick={() => {
            props.setSelectedBox(props.position);
          }}
        >
          <span>{props.element[0]}</span>
        </div>
      )}
    </>
  );
};

export default Board_creation;
