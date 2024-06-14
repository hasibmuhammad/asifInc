import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center">
      All rights reserved{" "}
      <Link
        to={"https://github.com/hasibmuhammad"}
        target="_blank"
        className="text-blue-400 font-semibold"
      >
        Asif Inc
      </Link>{" "}
      &copy; 2024
    </footer>
  );
};

export default Footer;
