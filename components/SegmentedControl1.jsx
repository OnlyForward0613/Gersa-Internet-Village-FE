import react, { useState } from "react";

const SegmentedControl = ({ setFormInput, lenght }) => {
  var controlClasses1 =
    "relative min-w-max min-h-max w-2/5 bg-pwaccent-500 px-4 py-1 text-center uppercase font-pally text-pwgray-100 translate-y-[33px] translate-x-10 rounded rounded-md z-10 shadow-lg cursor-pointer transition-all ease-in-out duration-500";

  var controlClasses2 =
    "relative min-w-max min-h-max w-2/5 bg-pwaccent-500 px-4 py-1 text-center uppercase font-pally text-pwgray-100 translate-y-[33px] translate-x-[10em] rounded rounded-md z-10 shadow-lg cursor-pointer transition-all ease-in-out duration-500";

  const [controlClasses, setControlClasses] = useState(controlClasses1);
  const [option, setOption] = useState("Email");
  return (
    <>
      <div style={{ minHeight: "30px" }} className={controlClasses}>
        {option}
      </div>
      <div className="flex flex-row m-auto w-3/4 bg-white rounded rounded-lg drop-shadow-lg border border-pwgray-400 justify-between items-center">
        <span
          className="px-4 py-1 w-1/2 text-center uppercase font-pally text-pwgray-600 cursor-pointer"
          onClick={() => {
            setControlClasses(controlClasses1);
            setOption("Email");
            if (setFormInput) {
              setFormInput({
                name: "Email",
                type: "email",
                leftIcon: "../public/images/GH.svg",
              });
            }
          }}
        >
          Email
        </span>
        <span
          className="px-4 py-1 w-1/2 text-center uppercase font-pally text-pwgray-600 cursor-pointer"
          onClick={() => {
            setControlClasses(controlClasses2);
            setOption("Phone");
            if (setFormInput) {
              setFormInput({ name: "Phone", type: "tel" });
            }
          }}
        >
          Phone
        </span>
      </div>
    </>
  );
};

export default SegmentedControl;
