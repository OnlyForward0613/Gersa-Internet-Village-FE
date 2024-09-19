import react, { useState } from "react";
import { BsList, BsX } from "react-icons/bs";
import { useProSidebar } from "react-pro-sidebar";

const Bars = ({ sidebarOpen, setSidebarOpen }) => {
  const { collapseSidebar } = useProSidebar();

  return (
    <button
      type="button"
      className="ml-4 fill-pwprimary-300 focus:outline-none hover:bg-pwgray-300 mx-auto p- z-11 rounded transition-all ease-in-out duration-500 overflow-hidden"
      onClick={(e) => {
        setSidebarOpen(!sidebarOpen);
        collapseSidebar(sidebarOpen);
      }}
      // console.log(e.target)}}
    >
      {!sidebarOpen ? (
        <BsList
          fill="current"
          className="active:translate-x-8 transition duration-500"
          size={40}
        />
      ) : (
        <BsX
          fill="current"
          className="active:-translate-x-8 transition duration-500"
          size={40}
        />
      )}
    </button>
  );
};

export default Bars;
