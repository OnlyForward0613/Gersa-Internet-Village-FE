import React, { useState } from "react";

const RadioInput = ({ name, value, reason, setReason }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="flex flex-row gap-1 items-center cursor-pointer"
      onClick={() => setReason(value)}
    >
      <input
        name={name}
        type={"radio"}
        value={value}
        checked={reason === value}
        onChange={() => setReason(value)}
        className="accent-pwgray-200 p-1 h-5 w-5 transition-all ease-in-out duration-500 border border-pwgray-400 border-1 form-control checked:accent-pwaccent-500"
      />
      <label htmlFor={"reasons"} className="text-lg ">
        {value}
      </label>
    </div>
  );
};

export default RadioInput;
