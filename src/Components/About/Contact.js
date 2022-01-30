import React from "react";
import Navbar from "../Navbar_components/Navbar";
import Sidebar from "../Navbar_components/Sidebar";
import Submenu from "../Navbar_components/Submenu";
import { useGlobalContext } from "../../context";
import { Button, Form } from "react-bootstrap/";
import "./About_Contact.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const { closeSubmenu } = useGlobalContext();

  let submitMessage, enterEmail, emailTitle, enterMessage, messageTitle;

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(e);
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
    alert(
      "Your message has been sent. You will receive an answer as soon as possible."
    );

    // if (props.language === "English") {
    //   alert(
    //     "Your message has been sent. You will receive an answer as soon as possible."
    //   );
    //   handleClose();
    // } else {
    //   alert(
    //     "El mensaje ha sido enviado. Recibirás una respuesta lo antes posible."
    //   );
    //   handleClose();
    // }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Submenu />
      <div className="about" onMouseOver={closeSubmenu}>
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">Contact</div>

          <p className="contect_info">
            Have any suggestions? Want any other games to be added? Send a
            message! You will receive an answer as soon as possible.
          </p>
          <Form onSubmit={sendEmail}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="form_data">Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                name="email"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="form_data">Message</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={6}
                name="message"
                placeholder="Write here your message"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Contact;
