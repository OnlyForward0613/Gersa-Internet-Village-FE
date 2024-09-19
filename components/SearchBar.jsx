import react, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  return (
    <div className="-ml-6 w-8/10 flex justify-center">
      <div className="flex mx-auto justify-center">
        <BsSearch
          size={20}
          className=" rounded rounded-[50%] h-8 w-8 p-2 hover:bg-transparent m-auto bg-transparent translate-x-8 z-50 fill-pwgray-500 transition ease-in-out duration-500"
        />
        <input
          className="pl-10 form-control bg-white backdrop-blur-sm placeholder:italic h-11 border border-1 border-pwgray-400 w-full rounded-lg drop-shadow-lg text-lg font-pally py-2 outline-none focus:border-[3px] focus:border-pwaccent-400 focus:outline-none hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
