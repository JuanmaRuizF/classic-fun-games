import * as SVGLoaders from "svg-loaders-react";
import "../../../Styles/memory_game.css";

const loading = () => {
  return (
    <>
      <div className="loading_content">
        <h2>Loading...</h2>
      </div>
      <div className="loading_content">
        <SVGLoaders.TailSpin width="200" height="200" />
      </div>
    </>
  );
};

export default loading;
