const create_grid_elements = () => {
  let elements = [];
  let current = "";
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      current = String(i) + String(j);
      elements[current] = {
        id: current,
        selected: "No",
        class_name: "grid-item",
      };
    }
  }
  return elements;
};

export default create_grid_elements;
