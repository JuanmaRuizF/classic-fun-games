import React, { useState, useEffect } from "react";
import Navbar from "../Navbar_components/Navbar";
import Sidebar from "../Navbar_components/Sidebar";
import Submenu from "../Navbar_components/Submenu";
import { useGlobalContext } from "../../context";
import { Button, Form } from "react-bootstrap/";
import "./About_Contact.css";
import emailjs from "emailjs-com";
import data from "./translation_data";

const Contact = () => {
  const { closeSubmenu, language, updateLanguage } = useGlobalContext();
  const [messageSent, setMessageSent] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    updateLanguage();
  });

  const displayMsg = () => {
    language === "English"
      ? setMessageSent(data["English"]["Contact"]["alertMsg"])
      : setMessageSent(data["Spanish"]["Contact"]["alertMsg"]);

    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 5000);
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "gmail",
        "template_tbatf44",
        e.target,
        "user_N1lP6J3jsE14VlvEdX2sH"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();

    displayMsg();
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Submenu />
      <div className="about" onMouseOver={closeSubmenu}>
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">
            {language === "English"
              ? data["English"]["Contact"]["title"]
              : data["Spanish"]["Contact"]["title"]}
          </div>

          <p className="contect_info">
            {language === "English"
              ? data["English"]["Contact"]["p1"]
              : data["Spanish"]["Contact"]["p1"]}
          </p>

          {showMsg ? (
            <div className="msg_sent">{messageSent}</div>
          ) : (
            <div></div>
          )}
          <Form onSubmit={sendEmail}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="form_data">Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder={
                  language === "English"
                    ? data["English"]["Contact"]["emailPlaceholder"]
                    : data["Spanish"]["Contact"]["emailPlaceholder"]
                }
                name="email"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="form_data">
                {" "}
                {language === "English"
                  ? data["English"]["Contact"]["msgTxt"]
                  : data["Spanish"]["Contact"]["msgTxt"]}
              </Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={6}
                name="message"
                placeholder={
                  language === "English"
                    ? data["English"]["Contact"]["msgPlaceholder"]
                    : data["Spanish"]["Contact"]["msgPlaceholder"]
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {language === "English"
                ? data["English"]["Contact"]["sendBtn"]
                : data["Spanish"]["Contact"]["sendBtn"]}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Contact;
