import { useState, useEffect } from "react";
import { BsPerson, BsCaretDownFill } from "react-icons/bs";
import Image from "next/image";

const User = ({ menuOpen, setMenuOpen, brandName, merchant }) => {
  return (
    <div className="w-16 lg:w-[200px] h-1/4 m-auto p-auto select-none transition-all ease-in-out duration-500">
      <button
        type="button"
        className="flex w-full h-full gap-2 fill-pwprimary-300 focus:outline-none focus:bg-pwgray-400 hover:bg-pwgray-300 p-auto m-auto p-1 rounded transition ease-in-out duration-500"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        {/* <BsPerson
          className="m-auto p-auto sm:w-1/2 h-1/2"
          size={20}
          fill="inherit"
        /> */}
        <div className="flex rounded-lg overflow-hidden">
          {merchant?.profile ? (
            <Image
              alt="merchant profile"
              height={80}
              width={80}
              src={merchant.profile}
            />
          ) : (
            ""
          )}
        </div>
        <span className="hidden m-auto p-auto w-72 lg:block text-pwprimary-300 font-pally text-xl">
          {!merchant
            ? ""
            : merchant.brandName?.length > 8
            ? merchant.brandName?.substring(0, 9) + "..."
            : merchant.brandName}
        </span>
        <BsCaretDownFill
          className="m-auto p-auto lg:w-1/4 h-full"
          size={20}
          fill="inherit"
        />
      </button>
    </div>
  );
};

export default User;
