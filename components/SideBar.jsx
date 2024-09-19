import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  BsColumnsGap,
  BsHandbag,
  BsReceiptCutoff,
  BsPerson,
  BsGear,
  BsBoxArrowLeft,
} from "react-icons/bs";
import Link from "next/link";
import SearchBar from "./SearchBar";

const SideBar = ({ sidebarOpen }) => {
  const activeClasses =
    "transition ease-in-out duration-500 text-pwsecondary-300";
  const inactiveClasses = "transition ease-in-out duration-500  ";

  const router = useRouter();

  useEffect(() => {
    // router.prefetch("/dashboard");
    router.prefetch("/products");
    // router.prefetch("/pendingorders");
    router.prefetch("/orders");
    router.prefetch("/account");
    router.prefetch("/settings");
    router.prefetch("/logout");
  }, [router]);

  return (
    <Sidebar
      className={
        sidebarOpen ? "bg-pwgray-200 backdrop-blur-sm" : "hidden sm:block"
      }
      style={{ position: "fixed", zIndex: "49" }}
      defaultCollapsed={true}
    >
      <Menu>
        <div
          className="flex-1 flex-col justify-between h-[89vh] sm:h-[86vh]"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // height: "86vh",
          }}
        >
          <div>
            {/* <div className="inline sm:hidden">
              <SearchBar />
            </div>
            <Link passHref href="/dashboard">
              <MenuItem
                className={
                  router.pathname === "/dashboard"
                    ? activeClasses
                    : inactiveClasses
                }
                icon={<BsColumnsGap size={25} />}
              >
                <span className="text-lg">Dashboard</span>
              </MenuItem>
            </Link> */}
            <Link passHref href="/products">
              <MenuItem
                className={
                  router.pathname === "/products"
                    ? activeClasses
                    : inactiveClasses
                }
                icon={<BsHandbag size={25} />}
              >
                <span className="text-lg">Products</span>
              </MenuItem>
            </Link>
            <Link passHref href="/orders">
              <MenuItem
                className={
                  router.pathname === "/orders"
                    ? activeClasses
                    : inactiveClasses
                }
                icon={<BsReceiptCutoff size={25} />}
              >
                <span className="text-lg">Orders</span>
              </MenuItem>
            </Link>
            <Link passHref href="/account">
              <MenuItem
                className={
                  router.pathname === "/account"
                    ? activeClasses
                    : inactiveClasses
                }
                icon={<BsPerson size={25} />}
              >
                <span className="text-lg">Account</span>
              </MenuItem>
            </Link>
            <Link passHref href="/settings">
              <MenuItem
                className={
                  router.pathname === "/settings"
                    ? activeClasses
                    : inactiveClasses
                }
                icon={<BsGear size={25} />}
              >
                <span className="text-lg">Settings</span>
              </MenuItem>
            </Link>
          </div>

          {/* <Link href={"/logout"}> */}
          <div className="text-pwdanger-300 ">
            <MenuItem
              icon={<BsBoxArrowLeft size={25} />}
              onClick={() => {
                router.push("/logout");
              }}
            >
              <span className="text-lg">Logout</span>
            </MenuItem>
          </div>
        </div>
        {/* </Link> */}
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
