import { useState, useEffect } from "react";

const Button_numbers = (props) => {
  const [numbers, setNumbers] = useState([
    [0, false],
    [1, false],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
  ]);

  const copy = [
    [0, false],
    [1, false],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
  ];

  useEffect(() => {
    if (props.selectedNumber === null) {
      setNumbers(copy);
    }
  }, [props.selectedNumber]);

  const handleClick = (element) => {
    props.setSelectedNumber(element[0]);

    let temp = copy;
    for (let i = 0; i < temp.length; i++) {
      //reset value selected making all false
      if (temp[i][1]) {
        temp[i][1] = false;
      }
    }

    temp[element[0]][1] = true; //make the selected value true so it's displayed with animation

    setNumbers(temp);
  };

  return (
    <>
      {numbers.map((element) => {
        return (
          <div key={element[0]} className="center_options">
            {element[1] ? (
              <div
                onClick={() => {
                  handleClick(element);
                }}
                className="item_button_selected"
              >
                {element[0]}
              </div>
            ) : (
              <div
                onClick={() => {
                  handleClick(element);
                }}
                className="item_button"
              >
                {element[0]}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Button_numbers;
