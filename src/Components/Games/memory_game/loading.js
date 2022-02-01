import * as SVGLoaders from "svg-loaders-react";
import "../../../Styles/memory_game.css";
import { useGlobalContext } from "../../../context";
const Loading = () => {
  const { language } = useGlobalContext();
  return (
    <>
      <div className="loading_content">
        <h2>{language === "English" ? "Loading..." : "Cargando..."}</h2>
      </div>
      <div className="loading_content">
        <SVGLoaders.TailSpin width="200" height="200" />
      </div>
    </>
  );
};

export default Loading;
