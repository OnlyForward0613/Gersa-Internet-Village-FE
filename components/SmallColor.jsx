import { BsTrash } from "react-icons/bs";
import React, { useState } from "react";

const SmallColor = ({ color, colors, setSelected }) => {
  const [deletable, setDeletable] = useState();

  return (
    <div
      onMouseEnter={() => setDeletable(true)}
      onMouseLeave={() => setDeletable(false)}
      className="cursor-pointer hover:brightness-75 transition ease-in-out duration-500"
    >
      <div
        className={
          deletable
            ? "w-fit relative flex m-auto top-7 transition ease-in-out duration-500 bg-pwgray-100 rounded"
            : "w-fit opacity-0 relative m-auto top-7 transition ease-in-out duration-500 bg-pwgray-100 rounded"
        }
        onClick={() => {
          var temp = colors;
          temp = temp.filter((c) => c !== color);
          setSelected(temp);
        }}
      >
        <BsTrash color="#000000" />
      </div>
      <div
        key={color}
        className="w-10 h-10 mx-auto border-2 border-pwgray-500 rounded-lg"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default SmallColor;
