import "./footer.css";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import data from "./translation_data";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const { language, updateLanguage } = useGlobalContext();
  const [arrayData, setArrayData] = useState(null);
  var result;
  useEffect(() => {
    updateLanguage();
  }, []);

  useEffect(() => {
    if (language === "English") {
      result = data["English"]["data"];
    } else {
      result = data["Spanish"]["data"];
    }
    result = result.filter((word) => word["name"] !== props.name);
    result = result
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));
    result = result.slice(0, 2);
    setArrayData(result);
  }, [language]);

  // useEffect(() => {
  //   result = result.filter((word) => word["name"] !== props.name);
  //   setArrayData(result);
  // }, []);
  return (
    <>
      <div className="text_info_footer">
        {language === "English"
          ? "If you liked this game you might also like..."
          : "Si te gustó este juego también te podría gustar..."}
      </div>

      <div className="footer_grid">
        {arrayData !== null ? (
          <>
            {arrayData.map((element) => {
              return (
                <Card
                  style={{ width: "30rem", height: "20rem" }}
                  className="card_footer"
                >
                  <Link to={element.url}>
                    <Card.Img variant="top" src={element.imgName} />
                  </Link>
                  <Card.Title>{element.name}</Card.Title>
                  {/* <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Link to={element.url}>
                      <Button variant="primary">Try it</Button>
                    </Link>
                  </Card.Body> */}
                </Card>
              );
            })}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Footer;
