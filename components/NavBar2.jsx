import react, { useRef, useState } from "react";
import Bars from "./Bars";
import Logo from "./Logo";
import SearchBar2 from "./SearchBar2";
import User from "./User";
import Menu2 from "./Menu2";

const NavBar2 = ({ setUser, sidebarOpen, setSidebarOpen, merchant }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const focusDiv = useRef();

  return (
    <nav className="z-50 top-0 h-16 bg-pwgray-200 backdrop-blur-sm">
      <div className="flex py-2 w-full">
        <Bars sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Logo />
        {/* <div className="w-1/2 hidden sm:inline">
          <SearchBar2 />
        </div> */}
        <div className="m-auto p-auto w-content mr-3">
          <User
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            focusDiv={focusDiv}
            merchant={merchant}
          />
        </div>
      </div>
      <Menu2
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setUser={setUser}
        focusDiv={focusDiv}
      />
    </nav>
  );
};

export default NavBar2;
