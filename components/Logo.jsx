import Image from "next/image";
import Link from "next/link";

const Logo = ({ searchOpen }) => {
  var logoClassesDefault =
    "select-none inline w-40 lg:ml-40 h-auto top-1 relative transition-all ease-in-out duration-500";

  return (
    <Link href="/">
      <a className={logoClassesDefault}>
        <Image
          src={require("../public/images/pricewards-logo-horizontal.svg")}
          alt="Pricewards Logo"
          height={220 / 3}
          width={840 / 3}
        />
      </a>
    </Link>
  );
};

export default Logo;
