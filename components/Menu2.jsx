import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { BsPerson, BsGear, BsBoxArrowLeft } from "react-icons/bs";

const Menu2 = ({ menuOpen, setMenuOpen, focusDiv }) => {
  var menuClassesOpen =
    "transition opacity-0 focus:block focus:opacity-100 ease-in-out duration-500 font-pally flex flex-col origin-top-right absolute right-[1%] mt-2 w-56 z-50 rounded-md shadow-lg bg-pwgray-200 ring-1 ring-pwgray-400/30 divide-gray-100 focus:outline-none";
  var menuClassesClosed =
    "hidden transition opacity-0 focus:block focus:opacity-100 ease-in-out duration-500 font-pally flex flex-col origin-top-right absolute right-[1%] mt-2 w-56 z-50 rounded-md shadow-lg bg-pwgray-200 ring-1 ring-pwgray-400/30 divide-gray-100 focus:outline-none";
  const [menuClasses, setMenuClasses] = useState(menuClassesOpen);
  // const focusDiv = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (menuOpen) {
      setMenuClasses(menuClassesOpen);
      focusDiv.current.focus();
    } else {
      setMenuClasses(menuClassesClosed);
    }
  });

  return (
    <div
      ref={focusDiv}
      className={menuClasses}
      role="menu"
      aria-orientation="vertical"
      tabIndex={-1}
      onFocus={() => {
        setMenuOpen(true);
      }}
      onBlur={() => {
        setMenuOpen(false);
      }}
    >
      <Link passHref href="/account">
        <div>
          <a className="z-50 py-2 px-4 flex focus:bg-pwgray-400 focus:outline-none focus:bg-pwgray-400 hover:bg-pwgray-300 transition ease-in-out duration-500">
            <BsPerson className="my-auto px-1" size={30} />

            <span className="my-auto px-1">Profile</span>
          </a>
        </div>
      </Link>
      <Link passHref href="/settings">
        <div>
          <a className=" z-50 py-2 px-4 flex focus:bg-pwgray-400 focus:outline-none focus:bg-pwgray-400 hover:bg-pwgray-300 transition ease-in-out duration-500">
            <BsGear className="my-auto px-1" size={30} />
            <span className="my-auto px-1">Settings</span>
          </a>
        </div>
      </Link>
      {/* <Link href={"/logout"}> */}
      <div
        onClick={() => {
          router.push("/logout");
        }}
      >
        <a
          className=" z-50 py-2 px-4 flex fill-pwdanger-300 focus:outline-none focus:bg-pwgray-400 hover:bg-pwgray-300 transition ease-in-out duration-500 cursor-pointer"
          target={"_parent"}
        >
          <BsBoxArrowLeft className="my-auto px-1" size={30} fill="inherit" />
          <span className="my-auto px-1 text-pwdanger-300">Logout</span>
        </a>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Menu2;
