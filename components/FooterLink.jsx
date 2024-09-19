import React from "react";

const FooterLink = ({ text, path }) => {
  return (
    <a
      href={path}
      className="text-pwaccent-400 hover:no-underline hover:text-pwaccent-500 transition ease-in-out duration-500 focus:text-pwaccent-600"
    >
      {text}
    </a>
  );
};

export default FooterLink;
