import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";
import Card from "../../component/card/Card";
import {
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_kgu3gr5",
        form.current,
        "v4VdjG_J5QW0_Dp3S"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
      e.target.reset()
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" rows={10} required textarea />
              <button type="submit" className="--btn --btn-primary">
                Send Message
              </button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span className={styles.icon}>
                  <FaPhoneAlt />
                  <p>+234 903 800 1805</p>
                </span>
                <span className={styles.icon}>
                  <FaEnvelope />
                  <p>support@lolmart.com</p>
                </span>
                <span className={styles.icon}>
                  <FaLocationArrow />
                  <p>Ib, Nigeria.</p>
                </span>
                <span className={styles.icon}>
                  <FaTwitter />
                  <p>@dejieuro</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
