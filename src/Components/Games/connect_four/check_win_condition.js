/* eslint-disable no-loop-func */
const check_win_condition = (elements, position, users_turn) => {
  let [row_number, column_number] = String(position).split("");
  if (
    check_vertical_values(elements, position, column_number, users_turn) ||
    check_horizontal_values(elements, position, row_number, users_turn) ||
    check_diagonal_values(elements, position, users_turn, "right") ||
    check_diagonal_values(elements, position, users_turn, "left")
  ) {
    return true;
  } else {
    return false;
  }
};

const check_horizontal_values = (
  elements,
  position,
  row_number,
  users_turn
) => {
  let horizontal_values = [];
  for (let i = 0; i <= 6; i++) {
    horizontal_values.push(row_number + String(i));
  }
  console.log(horizontal_values);
  let current_search = "";
  let count = 0;
  let win_condition = false;

  for (let i = 0; i <= 6; i++) {
    current_search = horizontal_values[i];
    elements.current.map((element) => {
      if (element.id === current_search) {
        if (element.class_name === users_turn + "-grid-item") {
          count += 1;
          if (count >= 4) {
            win_condition = true;
            return 0;
          }
        } else if (count >= 1) {
          count = 0;
          return 0;
        }
        return 0;
      }
      return 0;
    });
  }
  return win_condition;
};

const check_vertical_values = (
  elements,
  position,
  column_number,
  users_turn
) => {
  let vertical_values = [];
  for (let i = 1; i <= 6; i++) {
    vertical_values.push(String(i) + column_number);
  }

  let current_search = "";
  let count = 0;
  let win_condition = false;

  for (let i = 0; i <= 6; i++) {
    current_search = vertical_values[i];
    elements.current.map((element) => {
      if (element.id === current_search) {
        if (element.class_name === users_turn + "-grid-item") {
          count += 1;
          if (count >= 4) {
            win_condition = true;
            return 0;
          }
        } else if (count >= 1) {
          count = 0;
          return 0;
        }
        return 0;
      }
      return 0;
    });
  }
  return win_condition;
};

const check_diagonal_values = (
  elements,
  position,
  users_turn,
  right_or_left
) => {
  let diagonal_values = [];

  if (right_or_left === "left") {
    // diagonal left values increase by 11
    for (let i = 1; i <= 6; i++) {
      if (position - i * 11 >= 10) {
        diagonal_values.push(position - i * 11);
      }
    }
    for (let i = 1; i <= 6; i++) {
      if (+position + +i * +11 <= 66) {
        diagonal_values.push(+position + +i * +11);
      }
    }
  } else {
    //diagonal right values incrase by 9
    for (let i = 1; i <= 6; i++) {
      if (position - i * 9 >= 10) {
        diagonal_values.push(position - i * 9);
      }
    }
    for (let i = 1; i <= 6; i++) {
      if (+position + +i * +9 <= 66) {
        diagonal_values.push(+position + +i * +9);
      }
    }
  }

  diagonal_values.sort(function (a, b) {
    //sort the values to check correctly
    return a - b;
  });

  let current_search = "";
  let count = 1;
  let win_condition = false;

  for (let i = 0; i <= diagonal_values.length - 1; i++) {
    current_search = diagonal_values[i];
    elements.current.map((element) => {
      if (String(element.id) === String(current_search)) {
        if (element.class_name === users_turn + "-grid-item") {
          count += 1;
          if (count >= 4) {
            win_condition = true;
            return 0;
          }
        } else if (count > 1) {
          count = 1;
          return 0;
        }
        return 0;
      }
      return 0;
    });
  }
  return win_condition;
};

export default check_win_condition;
