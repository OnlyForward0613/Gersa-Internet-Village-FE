import react, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar2 = () => {
  var iconClassesDefault =
    "bg-pwgray-300 rounded rounded-[50%] sm:h-8 sm:w-8 sm:p-2 h-5 w-5 p-1 hover:bg-pwgray-400 sm:hover:bg-transparent sm:m-auto sm:bg-transparent translate-x-32 sm:translate-x-8 z-50 fill-pwgray-500 transition ease-in-out duration-500";

  var iconClassesOpen =
    "sm:h-8 sm:w-8 sm:p-2 h-5 w-5 p-1 my-auto fill-pwgray-500 translate-x-8 z-50";

  var iconClassesClosed =
    "sm:h-8 sm:w-8 sm:p-2 h-5 w-5 p-1 my-auto bg-pwgray-300 rounded rounded-[50%] hover:bg-pwgray-400 z-50 fill-pwgray-500 transition ease-in-out duration-500 translate-x-32 z-50";

  var inputClassesDefault =
    "transition-all ease-in-out duration-500 form-control bg-slate-50/90 backdrop-blur-sm placeholder:italic h-11 border border-1 border-pwgray-400 w-full rounded-lg drop-shadow-lg pl-10 text-lg font-pally py-2 outline-none focus:border-[3px] focus:border-pwaccent-400 focus:outline-none hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 hidden sm:inline";

  var inputClassesOpen =
    "transition-all ease-in-out duration-500 form-control placeholder:italic h-7 w-full border border-1 border-pwgray-400 rounded drop-shadow-2xl pl-10 text-lg font-pally py-2 outline-none focus:border-[3px] focus:border-pwaccent-400 focus:outline-none hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400";

  var inputClassesClosed =
    "h-5 w-5 rounded rounded-[50%] translate-x-28 bg-slate-50/70";

  const [iconClasses, setIconClasses] = useState(iconClassesDefault);
  const [inputClasses, setInputClasses] = useState(inputClassesDefault);
  const [placeholder, setPlaceholder] = useState("Search");

  return (
    <div className="w-full">
      <div className="flex mx-auto">
        <BsSearch
          className={iconClasses}
          size={20}
          // onClick={(event) => {
          //   if (event.view.screen.availWidth < 640) {
          //     setSearchOpen(!searchOpen);
          //     if (!searchOpen) {
          //       setIconClasses(iconClassesOpen);
          //       setInputClasses(inputClassesOpen);
          //       setPlaceholder("Search");
          //     } else {
          //       setIconClasses(iconClassesClosed);
          //       setInputClasses(inputClassesClosed);
          //       setPlaceholder("");
          //     }
          //   }
          // }}
        />
        <input
          className={inputClasses}
          type="search"
          placeholder={placeholder}
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar2;
