import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";

const Checkbox = ({
  label,
  setAccepted,
  sizes,
  setSizes,
  value,
  isChecked,
  setData,
}) => {
  const [checked, setChecked] = useState(isChecked);
  var temp = sizes;

  return (
    <div className="flex flex-row">
      <div className="flex fill-pwgray-200">
        <input
          checked={sizes ? sizes.includes(value) : isChecked}
          name="consent"
          type="checkbox"
          className="appearance-none transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 rounded w-full h-5 w-5 drop-shadow-lg mb-4 mx-2 form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 checked:bg-pwaccent-500"
          onChange={() => {
            setChecked(!checked);
            setAccepted ? setAccepted(!checked) : "";
          }}
        />
        <BsCheck
          className="-ml-7 z-10 my-0 h-5 w-5"
          fill="inherit"
          onClick={() => {
            setAccepted ? setAccepted(!checked) : "";
            if (sizes) {
              if (sizes.includes("Custom") && value === "Custom") {
                temp = [];
              } else if (!sizes.includes("Custom") && value === "Custom") {
                temp = ["Custom"];
                setData([]);
              }
              if (sizes.includes("Custom") && value !== "Custom") {
                temp = [];
                temp.push(value);
              } else if (!sizes.includes("Custom") && value !== "Custom") {
                if (!temp.includes(value)) {
                  temp.push(value);
                } else {
                  temp = temp.filter((val) => val !== value);
                }
              }

              setSizes(temp);
              setChecked(!checked);
            }
          }}
        />
      </div>
      <span
        onClick={() => {
          setAccepted ? setAccepted(!checked) : "";
          if (sizes) {
            if (sizes.includes("Custom") && value === "Custom") {
              temp = [];
            } else if (!sizes.includes("Custom") && value === "Custom") {
              temp = ["Custom"];
              setData([]);
            }
            if (sizes.includes("Custom") && value !== "Custom") {
              temp = [];
              temp.push(value);
            } else if (!sizes.includes("Custom") && value !== "Custom") {
              if (!temp.includes(value)) {
                temp.push(value);
              } else {
                temp = temp.filter((val) => val !== value);
              }
            }

            setSizes(temp);
            setChecked(!checked);
          }
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default Checkbox;
