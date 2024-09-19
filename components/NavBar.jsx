import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="absolute sticky top-0 left-0 right-0 max-w-screen-full z-50 bg-pwgray-200/80 drop-shadow-lg backdrop-blur-sm">
      <div className="max-w-max mx-auto py-2">
        <Link href="/">
          <a className="select-none sm:w-fit p-auto h-auto m-auto w-[50%]">
            <Image
              src={require("../public/images/pricewards-logo-horizontal.svg")}
              alt="logo"
              height={220 / 5}
              width={840 / 5}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
