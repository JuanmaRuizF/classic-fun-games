/* eslint-disable no-loop-func */
const put_value_in_place = (elements, key) => {
  let [row_number, column_number] = String(key).split("");

  let current_value = parseInt(column_number);
  let previous = 0;

  for (let i = 0; i < 6; i++) {
    current_value += 10;

    elements.current.map((element) => {
      if (element.id === String(current_value)) {
        if (element.selected === "No") {
          previous = element.id;
        }
      }
      return 0;
    });
  }
  return previous;
};

export default put_value_in_place;
