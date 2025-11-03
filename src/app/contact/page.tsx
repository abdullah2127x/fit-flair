import ContactPage from "./comp/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Fit Flair",
  description:
    "Get in touch with the Fit Flair team for any questions, feedback, or support. We're here to help you with your shopping experience.",
};

const Contact = () => {
  return <ContactPage />;
};

export default Contact;
