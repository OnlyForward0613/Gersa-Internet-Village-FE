const Button = ({ size, icon, text, mode, variant }) => {
  return (
    <>
      {size === "lg" && !variant ? (
        <button
          type="button"
          className={
            "transition-all ease-in-out duration-500 mx-auto py-3 px-4 bg-pwaccent-500 w-40 font-pally text-pwgray-100 uppercase rounded-lg hover:bg-pwaccent-600 outline outline-0 focus:outline focus:outline-4 focus:outline-pwaccent-300 active:bg-pwaccent-600"
          }
        >
          <span className="flex gap-1 px-1 justify-center">
            <span className={icon ? "m-auto" : "hidden"}>{icon}</span>
            {text ? text : ""}
          </span>
        </button>
      ) : variant === "secondary" ? (
        <button
          type="button"
          className={
            "transition-all ease-in-out duration-500 mx-auto py-2 px-3 bg-transparent w-40 font-pally text-pwaccent-500 uppercase rounded-lg border border-4 border-pwaccent-500 hover:border-pwaccent-600 hover:text-pwaccent-600 outline outline-0 focus:outline focus:outline-4 focus:outline-pwaccent-300 active:border-pwaccent-600 active:text-pwaccent-600"
          }
        >
          {text ? text : ""}
        </button>
      ) : (
        <button
          type="button"
          className={
            mode === "normal"
              ? "transition-all ease-in-out duration-500 m-auto p-1 bg-pwaccent-500 font-pally text-pwgray-100 uppercase rounded-md hover:bg-pwaccent-600 outline-0 focus:outline focus:outline-2 focus:outline-pwaccent-300 active:bg-pwaccent-600"
              : "transition-all ease-in-out duration-500 m-auto p-1 bg-pwdanger-300 font-pally text-pwgray-100 uppercase rounded-md hover:bg-red-700 outline-0 focus:outline focus:outline-2 focus:outline-red-700 active:bg-red-700"
          }
        >
          <span className="flex gap-2 px-1">
            <span className="m-auto">{icon}</span>
            <span className={text ? "m-auto" : "hidden"}>{text}</span>
          </span>
        </button>
      )}
    </>
  );
};

export default Button;
